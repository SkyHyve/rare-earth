export class ColumnSelector {
  applyColumnSelection(stmt: any, results: any[]): any[] {
    
    const isSelectAll = stmt.columns.length === 1 && 
                       stmt.columns[0].expr?.type === 'column_ref' && 
                       stmt.columns[0].expr?.column === '*';
    
    if (isSelectAll) {
      return results;
    } else {
      return results.map(row => {
        const newRow: any = {};
        stmt.columns.forEach((col: any) => {
          const expr = col.expr;
          
          // Handle aggregation functions
          if (expr?.type === 'aggr_func' || (expr?.type === 'function' && this.isAggregationFunction(expr.name))) {
            const funcName = expr.name.toUpperCase();
            
            // Extract column name from aggregation arguments
            let columnName: string | undefined;
            if (expr.args && expr.args.expr && expr.args.expr.column) {
              columnName = expr.args.expr.column;
            } else if (expr.args && expr.args.expr && expr.args.expr.length > 0) {
              columnName = expr.args.expr[0].column;
            } else if (expr.args && expr.args.length > 0) {
              columnName = expr.args[0].column;
            }
            
            const resultKey = col.as || `${funcName}(${columnName || '*'})`;
            newRow[col.as || resultKey] = row[resultKey];
          } else {
            // Regular column
            const colName = expr?.column || col.column || col;
            if (typeof colName === 'string') {
              newRow[col.as || colName] = row[colName];
            }
          }
        });
        return newRow;
      });
    }
  }

  private isAggregationFunction(name: string): boolean {
    const aggFunctions = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'];
    return aggFunctions.includes(name.toUpperCase());
  }

  applyColumnSelectionForJoin(stmt: any, results: any[]): any[] {
    const isSelectAll = stmt.columns.length === 1 && 
                       stmt.columns[0].expr?.type === 'column_ref' && 
                       stmt.columns[0].expr?.column === '*';
    
    if (isSelectAll) {
      // Flatten joined rows for SELECT *
      return results.map(joinedRow => {
        const flatRow: any = {};
        Object.values(joinedRow).forEach((tableRow: any) => {
          if (tableRow && typeof tableRow === 'object') {
            Object.assign(flatRow, tableRow);
          }
        });
        return flatRow;
      });
    } else {
      return results.map(joinedRow => {
        const newRow: any = {};
        stmt.columns.forEach((col: any) => {
          const tableRef = col.expr?.table;
          const colName = col.expr?.column || col.column || col;
          const resultKey = col.as || colName; // Use alias if present
          
          if (typeof colName === 'string') {
            if (tableRef && (joinedRow as any)[tableRef]) {
              newRow[resultKey] = (joinedRow as any)[tableRef][colName];
            } else {
              // Search all tables for the column
              for (const tableData of Object.values(joinedRow)) {
                if (tableData && typeof tableData === 'object' && (tableData as any)[colName] !== undefined) {
                  newRow[resultKey] = (tableData as any)[colName];
                  break;
                }
              }
            }
          }
        });
        return newRow;
      });
    }
  }
}