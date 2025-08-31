import { Parser } from 'node-sql-parser';
import { Table } from './types';
import { SQLEvaluator } from './execution/evaluator';
import { JoinHandler } from './execution/join-handler';
import { ColumnSelector } from './execution/column-selector';
import { AggregationHandler } from './execution/aggregation-handler';

export class SQLExecutor {
  private tables = new Map<string, Table>();
  private parser = new Parser();
  private evaluator: SQLEvaluator;
  private joinHandler: JoinHandler;
  private columnSelector: ColumnSelector;
  private aggregationHandler: AggregationHandler;

  constructor() {
    this.evaluator = new SQLEvaluator(this.tables, this.executeSelect.bind(this));
    this.joinHandler = new JoinHandler(this.tables, this.evaluator);
    this.columnSelector = new ColumnSelector();
    this.aggregationHandler = new AggregationHandler();
  }

  getTables(): Map<string, Table> {
    return this.tables;
  }

  setTable(name: string, table: Table): void {
    this.tables.set(name, table);
  }

  executeQuery(sql: string): any[] {
    try {
      console.log('Parsing SQL:', sql);
      const ast = this.parser.astify(sql);
      console.log('Parsed AST:', JSON.stringify(ast, null, 2));
      
      if (Array.isArray(ast)) {
        const lastStmt = ast[ast.length - 1];
        if (lastStmt.type === 'select') {
          return this.executeSelect(lastStmt, {});
        }
      } else if (ast.type === 'select') {
        return this.executeSelect(ast, {});
      }
      throw new Error('Only SELECT queries are supported');
    } catch (error) {
      // Check if it's a SQL parsing error
      if (error instanceof Error && error.message.includes('Expected')) {
        throw new Error('Invalid SQL');
      }
      console.error('SQL execution error:', error);
      throw error;
    }
  }

  executeSelect(stmt: any, outerContext: { [tableName: string]: any } = {}): any[] {
    // Handle SELECT without FROM (e.g., SELECT 1, SELECT 2, etc.)
    if (!stmt.from || stmt.from.length === 0) {
      const result: any = {};
      stmt.columns.forEach((col: any, index: number) => {
        const value = col.expr?.value || col.value || index + 1;
        const key = col.as || `column_${index}`;
        result[key] = value;
      });
      return [result];
    }

    // Handle single table or JOINs
    if (stmt.from.length === 1 && !stmt.from[0].join) {
      // Single table query
      const tableName = stmt.from[0].table;
      const tableAlias = stmt.from[0].as || tableName;
      const table = this.tables.get(tableName);
      if (!table) throw new Error(`Table ${tableName} does not exist`);


      let results = [...table.data];

      // Apply WHERE clause if present
      if (stmt.where) {
        results = results.filter(row => {
          const context = { ...outerContext, [tableAlias]: row };
          return this.evaluator.evaluateWhere(row, stmt.where, context);
        });
      }

      // Apply GROUP BY and aggregations
      results = this.aggregationHandler.processGroupBy(stmt, results);

      return this.columnSelector.applyColumnSelection(stmt, results);
    } else {
      // JOIN query
      const joinResults = this.joinHandler.executeJoinQuery(stmt, outerContext);
      
      // Apply GROUP BY and aggregations to JOIN results
      const aggregatedResults = this.aggregationHandler.processGroupBy(stmt, joinResults);
      
      return this.columnSelector.applyColumnSelectionForJoin(stmt, aggregatedResults);
    }
  }
}