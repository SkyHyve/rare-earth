import { PreparedStatement, SQLEngine as SQLEngineInterface } from './sql/types';
import { isValidSQLIdentifier } from './sql/validator';
import { SQLExecutor } from './sql/executor';
import { SQLiteStatement } from './sql/statement';

export class SQLEngine implements SQLEngineInterface {
  private executor = new SQLExecutor();

  setTable(name: string, columns: { [key: string]: 'TEXT' | 'REAL' }, data: any[]): void {
    if (!isValidSQLIdentifier(name)) {
      throw new Error(`Invalid table name: "${name}". Table names must be valid SQL identifiers.`);
    }
    this.executor.setTable(name, { columns, data });
  }

  prepare(sql: string): PreparedStatement {
    return new SQLiteStatement(this.executor, sql);
  }

  executeQuery(sql: string): any[] {
    return this.executor.executeQuery(sql);
  }
}