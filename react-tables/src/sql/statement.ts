import { PreparedStatement } from './types';
import { SQLExecutor } from './executor';

export class SQLiteStatement implements PreparedStatement {
  private executor: SQLExecutor;
  private sql: string;
  private results: any[] = [];
  private currentIndex = 0;
  private executed = false;

  constructor(executor: SQLExecutor, sql: string) {
    this.executor = executor;
    this.sql = sql;
  }

  step(): boolean {
    if (!this.executed) {
      this.results = this.executor.executeQuery(this.sql);
      this.executed = true;
    }
    return this.currentIndex < this.results.length;
  }

  getAsObject(): any {
    if (this.currentIndex < this.results.length) {
      return this.results[this.currentIndex++];
    }
    return {};
  }

  free(): void {
    this.results = [];
    this.currentIndex = 0;
    this.executed = false;
  }
}