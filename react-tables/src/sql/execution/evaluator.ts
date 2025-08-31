import { Table } from '../types';

export class SQLEvaluator {
  private tables: Map<string, Table>;
  private executeSelect: (stmt: any, outerContext: { [tableName: string]: any }) => any[];

  constructor(
    tables: Map<string, Table>, 
    executeSelect: (stmt: any, outerContext: { [tableName: string]: any }) => any[]
  ) {
    this.tables = tables;
    this.executeSelect = executeSelect;
  }

  evaluateWhere(row: any, whereClause: any, context: { [tableName: string]: any } = {}): boolean {
    if (whereClause.type === 'binary_expr') {
      const left = this.evaluateExpression(row, whereClause.left, context);
      const right = this.evaluateExpression(row, whereClause.right, context);
      
      console.log(`WHERE evaluation: ${left} ${whereClause.operator} ${right} (types: ${typeof left}, ${typeof right})`);
      console.log('Full whereClause:', JSON.stringify(whereClause, null, 2));
      
      switch (whereClause.operator) {
        case '=': 
          // Handle = ANY() where right side is an array from ANY function
          if (Array.isArray(right)) {
            console.log('Handling = with array from ANY function:', right);
            return right.some(val => left == val);
          }
          return left == right;
        case '!=': return left != right;
        case '>': return left > right;
        case '<': return left < right;
        case '>=': return left >= right;
        case '<=': return left <= right;
        case 'LIKE': return String(left).toLowerCase().includes(String(right).toLowerCase().replace(/%/g, ''));
        case 'IN': 
          if (Array.isArray(right)) {
            return right.includes(left);
          }
          return false;
        case 'NOT IN':
          if (Array.isArray(right)) {
            return !right.includes(left);
          }
          return true;
        case '= ANY':
        case 'IN ANY':
          if (Array.isArray(right)) {
            return right.some(val => left == val);
          }
          return false;
        case '!= ANY':
        case '<> ANY':
          if (Array.isArray(right)) {
            return right.some(val => left != val);
          }
          return false;
        case '> ANY':
          if (Array.isArray(right)) {
            return right.some(val => left > val);
          }
          return false;
        case '< ANY':
          if (Array.isArray(right)) {
            return right.some(val => left < val);
          }
          return false;
        case '>= ANY':
          if (Array.isArray(right)) {
            return right.some(val => left >= val);
          }
          return false;
        case '<= ANY':
          if (Array.isArray(right)) {
            return right.some(val => left <= val);
          }
          return false;
        case '= ALL':
          if (Array.isArray(right)) {
            return right.every(val => left == val);
          }
          return false;
        case '!= ALL':
        case '<> ALL':
          if (Array.isArray(right)) {
            return right.every(val => left != val);
          }
          return false;
        case '> ALL':
          if (Array.isArray(right)) {
            return right.every(val => left > val);
          }
          return false;
        case '< ALL':
          if (Array.isArray(right)) {
            return right.every(val => left < val);
          }
          return false;
        case '>= ALL':
          if (Array.isArray(right)) {
            return right.every(val => left >= val);
          }
          return false;
        case '<= ALL':
          if (Array.isArray(right)) {
            return right.every(val => left <= val);
          }
          return false;
        default: return true;
      }
    } else if (whereClause.type === 'unary_expr' && whereClause.operator === 'EXISTS') {
      const subqueryResults = this.executeSelect(whereClause.expr, context);
      return subqueryResults.length > 0;
    } else if (whereClause.type === 'unary_expr' && whereClause.operator === 'NOT EXISTS') {
      const subqueryResults = this.executeSelect(whereClause.expr, context);
      return subqueryResults.length === 0;
    }
    return true;
  }

  evaluateExpression(row: any, expr: any, context: { [tableName: string]: any } = {}): any {
    console.log('evaluateExpression called with expr:', JSON.stringify(expr, null, 2));
    
    // Handle ANY() function calls
    if (expr.type === 'function' && expr.name) {
      // Handle complex name structure: { name: [{ type: "default", value: "ANY" }] }
      let functionName = '';
      if (typeof expr.name === 'string') {
        functionName = expr.name;
      } else if (expr.name.name && Array.isArray(expr.name.name) && expr.name.name[0] && expr.name.name[0].value) {
        functionName = expr.name.name[0].value;
      }
      
      if (functionName.toUpperCase() === 'ANY') {
        console.log('Found ANY function call:', expr);
        if (expr.args && expr.args.value) {
          const values = expr.args.value.map((arg: any) => this.evaluateExpression(row, arg, context));
          console.log('ANY function values:', values);
          return values;
        }
      }
    }
    
    if (expr.column) {
      // Handle table-qualified columns (table.column)
      if (expr.table && context[expr.table]) {
        return context[expr.table][expr.column];
      }
      // Regular column reference
      return row[expr.column];
    } else if (expr.value !== undefined) {
      // Literal value
      return expr.value;
    } else if (expr.type === 'select' || (expr.ast && expr.ast.type === 'select')) {
      // Subquery execution - handle both direct and nested AST structures
      const selectStmt = expr.type === 'select' ? expr : expr.ast;
      const subqueryResults = this.executeSelect(selectStmt, context);
      console.log('Subquery results in evaluateExpression:', subqueryResults);
      
      // For simple subqueries that return a single value (like SELECT AVG(...)), return scalar
      if (subqueryResults.length === 1 && Object.keys(subqueryResults[0]).length === 1) {
        const scalarValue = Object.values(subqueryResults[0])[0];
        console.log('Returning scalar value:', scalarValue, 'type:', typeof scalarValue);
        return scalarValue;
      }
      
      // For correlated subqueries or multiple results, return array of first column values
      const values = subqueryResults.map(r => Object.values(r)[0]);
      console.log('Returning array values:', values);
      return values;
    } else if (expr.type === 'expr_list') {
      // List of values (for IN clause)
      return expr.value.map((v: any) => this.evaluateExpression(row, v, context));
    }
    return expr;
  }
}