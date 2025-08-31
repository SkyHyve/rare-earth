export class AggregationHandler {
  processGroupBy(stmt: any, results: any[]): any[] {
    // If no GROUP BY, check if we have aggregation functions without GROUP BY
    if (!stmt.groupby) {
      const hasAggregation = this.hasAggregationFunctions(stmt.columns);
      if (hasAggregation) {
        // Aggregate over entire result set
        return [this.calculateAggregations(stmt.columns, results)];
      }
      return results;
    }

    // Group results by GROUP BY columns
    const groups = new Map<string, any[]>();
    
    // Handle different GROUP BY AST structures
    const groupByColumns = Array.isArray(stmt.groupby) ? stmt.groupby : [stmt.groupby];
    
    for (const row of results) {
      const groupKey = groupByColumns.map((col: any) => {
        // Extract column name from GROUP BY AST structure
        let colName: string | undefined;
        if (col.columns && col.columns.length > 0 && col.columns[0].column) {
          colName = col.columns[0].column;
        } else if (col.expr && col.expr.column) {
          colName = col.expr.column;
        } else if (col.column) {
          colName = col.column;
        } else if (typeof col === 'string') {
          colName = col;
        }
        
        return colName ? row[colName] : null;
      }).join('|');
      
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(row);
    }

    // Calculate aggregations for each group
    const aggregatedResults: any[] = [];
    for (const [groupKey, groupRows] of groups) {
      const aggregatedRow = this.calculateAggregations(stmt.columns, groupRows);
      
      // Add GROUP BY columns to the result ONLY if they are in the SELECT list
      groupByColumns.forEach((col: any, index: number) => {
        // Extract column name from GROUP BY AST structure
        let colName: string | undefined;
        if (col.columns && col.columns.length > 0 && col.columns[0].column) {
          colName = col.columns[0].column;
        } else if (col.expr && col.expr.column) {
          colName = col.expr.column;
        } else if (col.column) {
          colName = col.column;
        } else if (typeof col === 'string') {
          colName = col;
        }
        
        // Check if this GROUP BY column is in the SELECT list
        const isInSelect = stmt.columns.some((selectCol: any) => {
          const selectColName = selectCol.expr?.column || selectCol.column;
          return selectColName === colName;
        });
        
        const groupValues = groupKey.split('|');
        if (colName && isInSelect) {
          // Preserve the original type from the group key
          const originalValue = groupValues[index];
          // Try to convert back to number if it was originally a number
          const numValue = Number(originalValue);
          aggregatedRow[colName] = !isNaN(numValue) && originalValue !== 'null' ? numValue : originalValue;
        }
      });
      
      aggregatedResults.push(aggregatedRow);
    }

    return aggregatedResults;
  }

  private hasAggregationFunctions(columns: any[]): boolean {
    return columns.some(col => {
      const expr = col.expr;
      return expr?.type === 'aggr_func' || 
             (expr?.type === 'function' && this.isAggregationFunction(expr.name));
    });
  }

  private isAggregationFunction(name: string): boolean {
    const aggFunctions = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'];
    return aggFunctions.includes(name.toUpperCase());
  }

  private calculateAggregations(columns: any[], rows: any[]): any {
    const result: any = {};
    
    columns.forEach((col: any) => {
      const alias = col.as;
      const expr = col.expr;
      
      if (expr?.type === 'aggr_func' || (expr?.type === 'function' && this.isAggregationFunction(expr.name))) {
        const funcName = expr.name.toUpperCase();
        
        // Extract column name from various AST structures
        let columnName: string | undefined;
        
        if (expr.args && expr.args.expr && expr.args.expr.column) {
          columnName = expr.args.expr.column;
        } else if (expr.args && expr.args.expr && expr.args.expr.length > 0) {
          columnName = expr.args.expr[0].column;
        } else if (expr.args && expr.args.length > 0) {
          columnName = expr.args[0].column;
        } else if (expr.args && expr.args.column) {
          columnName = expr.args.column;
        } else if (expr.column) {
          columnName = expr.column;
        }
        
        const resultKey = alias || `${funcName}(${columnName || '*'})`;
        
        switch (funcName) {
          case 'COUNT':
            if (columnName === '*' || !columnName) {
              result[resultKey] = rows.length;
            } else {
              result[resultKey] = rows.filter(row => row[columnName] != null).length;
            }
            break;
            
          case 'SUM':
            if (!columnName) throw new Error('SUM requires a column name');
            result[resultKey] = rows.reduce((sum, row) => {
              const val = Number(row[columnName]);
              return sum + (isNaN(val) ? 0 : val);
            }, 0);
            break;
            
          case 'AVG':
            if (!columnName) throw new Error('AVG requires a column name');
            const validValues = rows.filter(row => row[columnName] != null && !isNaN(Number(row[columnName])));
            if (validValues.length === 0) {
              result[resultKey] = null;
            } else {
              const sum = validValues.reduce((sum, row) => sum + Number(row[columnName]), 0);
              result[resultKey] = Number(sum / validValues.length); // Ensure it's a number
            }
            break;
            
          case 'MIN':
            if (!columnName) throw new Error('MIN requires a column name');
            const minValues = rows.filter(row => row[columnName] != null);
            result[resultKey] = minValues.length > 0 ? 
              Math.min(...minValues.map(row => Number(row[columnName])).filter(val => !isNaN(val))) : 
              null;
            break;
            
          case 'MAX':
            if (!columnName) throw new Error('MAX requires a column name');
            const maxValues = rows.filter(row => row[columnName] != null);
            result[resultKey] = maxValues.length > 0 ? 
              Math.max(...maxValues.map(row => Number(row[columnName])).filter(val => !isNaN(val))) : 
              null;
            break;
            
          default:
            throw new Error(`Unsupported aggregation function: ${funcName}`);
        }
      } else if (expr?.type === 'column_ref') {
        // Non-aggregated column - should be in GROUP BY
        const colName = expr.column;
        if (rows.length > 0) {
          result[alias || colName] = rows[0][colName];
        }
      }
    });
    
    return result;
  }
}