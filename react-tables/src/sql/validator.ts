export function isValidSQLIdentifier(name: string): boolean {
  // SQL identifier rules:
  // - Must start with letter or underscore
  // - Can contain letters, digits, underscores
  // - Cannot be a SQL reserved word
  // - Length typically limited (here we'll use 128)
  
  if (!name || name.length === 0 || name.length > 128) {
    return false;
  }
  
  // Must start with letter or underscore
  if (!/^[a-zA-Z_]/.test(name)) {
    return false;
  }
  
  // Can only contain letters, digits, underscores
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
    return false;
  }
  
  // Check against SQL reserved words
  const reservedWords = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER',
    'ON', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'LIKE', 'BETWEEN', 'IS',
    'NULL', 'TRUE', 'FALSE', 'CREATE', 'DROP', 'INSERT', 'UPDATE', 'DELETE',
    'TABLE', 'INDEX', 'VIEW', 'DATABASE', 'SCHEMA', 'PRIMARY', 'KEY',
    'FOREIGN', 'REFERENCES', 'UNIQUE', 'CHECK', 'DEFAULT', 'AUTO_INCREMENT',
    'CONSTRAINT', 'COLUMN', 'ALTER', 'ADD', 'MODIFY', 'CHANGE', 'RENAME',
    'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL',
    'DISTINCT', 'AS', 'ASC', 'DESC', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
    'ANY', 'SOME'
  ];
  
  return !reservedWords.includes(name.toUpperCase());
}