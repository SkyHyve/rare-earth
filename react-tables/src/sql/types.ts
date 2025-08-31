export interface Table {
  columns: { [key: string]: 'TEXT' | 'REAL' };
  data: any[];
}

export interface PreparedStatement {
  step: () => boolean;
  getAsObject: () => any;
  free: () => void;
}

export interface SQLEngine {
  setTable: (name: string, columns: { [key: string]: 'TEXT' | 'REAL' }, data: any[]) => void;
  prepare: (sql: string) => PreparedStatement;
  executeQuery: (sql: string) => any[];
}