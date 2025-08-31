import { Table } from '../types';
import { SQLEvaluator } from './evaluator';

export class JoinHandler {
  private tables: Map<string, Table>;
  private evaluator: SQLEvaluator;

  constructor(tables: Map<string, Table>, evaluator: SQLEvaluator) {
    this.tables = tables;
    this.evaluator = evaluator;
  }

  executeJoinQuery(stmt: any, outerContext: { [tableName: string]: any }): any[] {
    // Start with the first table
    const firstTable = stmt.from[0];
    const firstTableName = firstTable.table;
    const firstTableAlias = firstTable.as || firstTableName;
    const table1 = this.tables.get(firstTableName);
    if (!table1) throw new Error(`Table ${firstTableName} does not exist`);

    let results = table1.data.map(row => ({ [firstTableAlias]: row }));

    // Process each JOIN
    for (let i = 0; i < stmt.from.length; i++) {
      const fromItem = stmt.from[i];
      if (fromItem.join) {
        const joinType = fromItem.join.toUpperCase();
        const rightTableName = fromItem.table;
        const rightTableAlias = fromItem.as || rightTableName;
        const table2 = this.tables.get(rightTableName);
        if (!table2) throw new Error(`Table ${rightTableName} does not exist`);

        const joinCondition = fromItem.on;
        results = this.performJoin(results, table2.data, joinType, joinCondition, rightTableAlias, outerContext);
      }
    }

    // Apply WHERE clause
    if (stmt.where) {
      results = results.filter(joinedRow => {
        const context = { ...outerContext, ...joinedRow };
        return this.evaluator.evaluateWhere(joinedRow, stmt.where, context);
      });
    }

    return results;
  }

  private performJoin(
    leftResults: any[], 
    rightData: any[], 
    joinType: string, 
    joinCondition: any, 
    rightTableAlias: string,
    outerContext: { [tableName: string]: any }
  ): any[] {
    const results: any[] = [];

    for (const leftRow of leftResults) {
      let hasMatch = false;

      for (const rightRow of rightData) {
        const combinedRow = { ...leftRow, [rightTableAlias]: rightRow };
        const context = { ...outerContext, ...combinedRow };

        if (!joinCondition || this.evaluator.evaluateWhere(combinedRow, joinCondition, context)) {
          results.push(combinedRow);
          hasMatch = true;
        }
      }

      // Handle LEFT JOIN - include unmatched left rows
      if (!hasMatch && (joinType === 'LEFT' || joinType === 'LEFT OUTER')) {
        results.push({ ...leftRow, [rightTableAlias]: null });
      }
    }

    // Handle RIGHT JOIN - include unmatched right rows
    if (joinType === 'RIGHT' || joinType === 'RIGHT OUTER') {
      for (const rightRow of rightData) {
        let hasMatch = false;
        for (const leftRow of leftResults) {
          const combinedRow = { ...leftRow, [rightTableAlias]: rightRow };
          const context = { ...outerContext, ...combinedRow };
          if (!joinCondition || this.evaluator.evaluateWhere(combinedRow, joinCondition, context)) {
            hasMatch = true;
            break;
          }
        }
        if (!hasMatch) {
          const nullLeftRow: any = {};
          Object.keys(leftResults[0] || {}).forEach(key => {
            nullLeftRow[key] = null;
          });
          results.push({ ...nullLeftRow, [rightTableAlias]: rightRow });
        }
      }
    }

    return results;
  }
}