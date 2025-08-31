import { SQLEngine } from '../../../dist/bundle.cjs';
import * as testData from '../data/index.json';

// Simple test runner
class TestRunner {
  private tests: Array<{ name: string; fn: () => void }> = [];
  private passed = 0;
  private failed = 0;

  test(name: string, fn: () => void) {
    this.tests.push({ name, fn });
  }

  run() {
    console.log('Running SQL Engine Tests...\n');
    
    for (const test of this.tests) {
      try {
        test.fn();
        console.log(`✓ ${test.name}`);
        this.passed++;
      } catch (error) {
        console.log(`✗ ${test.name}`);
        console.log(`  Error: ${error instanceof Error ? error.message : String(error)}`);
        this.failed++;
      }
    }
    
    console.log(`\nResults: ${this.passed} passed, ${this.failed} failed`);
    if (this.failed > 0) {
      process.exit(1);
    }
  }
}

function expect(actual: any) {
  return {
    toBe: (expected: any) => {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`);
      }
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
      }
    },
    toHaveLength: (length: number) => {
      if (!Array.isArray(actual) || actual.length !== length) {
        throw new Error(`Expected array of length ${length}, got ${Array.isArray(actual) ? actual.length : 'not an array'}`);
      }
    },
    toBeGreaterThan: (value: number) => {
      if (actual <= value) {
        throw new Error(`Expected ${actual} to be greater than ${value}`);
      }
    }
  };
}

const runner = new TestRunner();

// Initialize SQL engine with test data
const engine = new SQLEngine();

// Convert column arrays to column maps
const productsColumns: { [key: string]: 'TEXT' | 'REAL' } = {};
testData.products.columns.forEach(col => {
  productsColumns[col.key] = col.type === 'number' ? 'REAL' : 'TEXT';
});

const salesColumns: { [key: string]: 'TEXT' | 'REAL' } = {};
testData.sales.columns.forEach(col => {
  salesColumns[col.key] = col.type === 'number' ? 'REAL' : 'TEXT';
});

const usersColumns: { [key: string]: 'TEXT' | 'REAL' } = {};
testData.users.columns.forEach(col => {
  usersColumns[col.key] = col.type === 'number' ? 'REAL' : 'TEXT';
});

engine.setTable('products', productsColumns, testData.products.records);
engine.setTable('sales', salesColumns, testData.sales.records);
engine.setTable('users', usersColumns, testData.users.records);

// Basic SELECT tests
runner.test('SELECT * FROM products', () => {
  const results = engine.executeQuery('SELECT * FROM products');
  expect(results).toHaveLength(20);
  expect(results[0]).toEqual({
    product_id: 1,
    name: "Laptop Pro",
    category: "Electronics",
    price: 1200
  });
});

runner.test('SELECT specific columns', () => {
  const results = engine.executeQuery('SELECT product_id, name FROM products');
  expect(results).toHaveLength(20);
  expect(Object.keys(results[0])).toEqual(['product_id', 'name']);
});

runner.test('WHERE clause with number comparison', () => {
  const results = engine.executeQuery('SELECT * FROM products WHERE price > 100');
  expect(results.length).toBeGreaterThan(0);
  results.forEach(product => {
    expect(product.price).toBeGreaterThan(100);
  });
});

runner.test('WHERE clause with string comparison', () => {
  const results = engine.executeQuery("SELECT * FROM products WHERE category = 'Electronics'");
  expect(results.length).toBeGreaterThan(0);
  results.forEach(product => {
    expect(product.category).toBe('Electronics');
  });
});

// JOIN tests
runner.test('INNER JOIN', () => {
  const results = engine.executeQuery(`
    SELECT sales.sale_id, products.name, sales.quantity
    FROM sales 
    JOIN products ON sales.product_id = products.product_id
  `);
  expect(results.length).toBeGreaterThan(0);
  expect(results[0]).toEqual({
    sale_id: 1,
    name: "Laptop Pro",
    quantity: 2
  });
});

runner.test('Three-way JOIN', () => {
  const results = engine.executeQuery(`
    SELECT users.name as customer_name, products.name as product_name, sales.quantity
    FROM sales
    JOIN users ON sales.user_id = users.user_id
    JOIN products ON sales.product_id = products.product_id
    WHERE sales.sale_id = 1
  `);
  expect(results).toHaveLength(1);
  expect(results[0]).toEqual({
    customer_name: "Eve Davis",
    product_name: "Laptop Pro", 
    quantity: 2
  });
});

// Aggregation tests
runner.test('COUNT(*)', () => {
  const results = engine.executeQuery('SELECT COUNT(*) FROM sales');
  expect(results).toHaveLength(1);
  expect(results[0]['COUNT(*)']).toBe(30);
});

runner.test('SUM with GROUP BY', () => {
  const results = engine.executeQuery('SELECT product_id, SUM(quantity) FROM sales GROUP BY product_id');
  expect(results.length).toBeGreaterThan(0);
  // Should have entries for each product that has sales
});

runner.test('AVG with GROUP BY', () => {
  const results = engine.executeQuery('SELECT product_id, AVG(quantity) FROM sales GROUP BY product_id');
  expect(results.length).toBeGreaterThan(0);
  // Each result should have product_id and AVG(quantity)
  console.log('AVG result sample:', results[0], 'type:', typeof results[0]['AVG(quantity)']);
  results.forEach(row => {
    expect(typeof row.product_id).toBe('number');
    expect(typeof row['AVG(quantity)']).toBe('number');
  });
});

// Subquery tests
runner.test('Simple subquery', () => {
  // First test that the subquery works standalone
  const avgResult = engine.executeQuery('SELECT AVG(price) FROM products');
  console.log('Average price subquery:', avgResult);
  console.log('Average price value:', avgResult[0]['AVG(price)']);
  
  // Test products with price > average
  const allProducts = engine.executeQuery('SELECT price FROM products ORDER BY price');
  console.log('All product prices:', allProducts.map(p => p.price));
  console.log('Products with price > 189.65:', allProducts.filter(p => p.price > 189.65).length);
  
  const results = engine.executeQuery(`
    SELECT * FROM products 
    WHERE price > (SELECT AVG(price) FROM products)
  `);
  // Should return products with above-average price
  console.log('Simple subquery results:', results.length);
  expect(results.length).toBeGreaterThan(0);
});

runner.test('Correlated subquery', () => {
  const results = engine.executeQuery(`
    SELECT s1.sale_id, s1.product_id, s1.quantity
    FROM sales s1
    WHERE s1.quantity > (
      SELECT AVG(s2.quantity)
      FROM sales s2
      WHERE s2.product_id = s1.product_id
    )
  `);
  // Should return sales with above-average quantity for their product
  console.log('Correlated subquery results:', results.length);
  expect(results.length).toBeGreaterThan(0);
});

runner.test('EXISTS subquery', () => {
  const results = engine.executeQuery(`
    SELECT * FROM users u
    WHERE EXISTS (
      SELECT 1 FROM sales s WHERE s.user_id = u.user_id
    )
  `);
  // Should return users who have made purchases
  expect(results.length).toBeGreaterThan(0);
});

// =ANY() WHERE clause tests
runner.test('= ANY with literal array', () => {
  const results = engine.executeQuery(`
    SELECT * FROM products 
    WHERE category = ANY (ARRAY['Electronics', 'Books'])
  `);
  expect(results.length).toBeGreaterThan(0);
  results.forEach(product => {
    expect(['Electronics', 'Books'].includes(product.category)).toBe(true);
  });
});

runner.test('= ANY with subquery', () => {
  const results = engine.executeQuery(`
    SELECT * FROM products p
    WHERE p.product_id = ANY (
      SELECT s.product_id FROM sales s WHERE s.quantity > 2
    )
  `);
  // Should return products that have sales with quantity > 2
  expect(results.length).toBeGreaterThan(0);
  results.forEach(product => {
    // Verify each product has at least one sale with quantity > 2
    const productSales = engine.executeQuery(`
      SELECT quantity FROM sales WHERE product_id = ${product.product_id}
    `);
    const hasHighQuantitySale = productSales.some(sale => sale.quantity > 2);
    expect(hasHighQuantitySale).toBe(true);
  });
});

runner.test('!= ANY with literal array', () => {
  const results = engine.executeQuery(`
    SELECT * FROM products 
    WHERE category != ANY (ARRAY['Electronics', 'Books'])
  `);
  expect(results.length).toBeGreaterThan(0);
  results.forEach(product => {
    // Should include products where category is NOT Electronics AND NOT Books
    expect(!['Electronics', 'Books'].includes(product.category)).toBe(true);
  });
});

runner.test('> ANY with subquery', () => {
  const results = engine.executeQuery(`
    SELECT * FROM products p
    WHERE p.price > ANY (
      SELECT s.quantity * 10 FROM sales s WHERE s.product_id = p.product_id
    )
  `);
  // Should return products where price > any of the calculated values from their sales
  expect(results.length).toBeGreaterThan(0);
});

runner.test('< ANY with literal array', () => {
  const results = engine.executeQuery(`
    SELECT * FROM products 
    WHERE price < ANY (ARRAY[100, 200, 300])
  `);
  // Should return products with price less than at least one of these values
  expect(results.length).toBeGreaterThan(0);
  results.forEach(product => {
    expect(product.price < 100 || product.price < 200 || product.price < 300).toBe(true);
  });
});

runner.test('>= ANY with subquery', () => {
  const results = engine.executeQuery(`
    SELECT * FROM users u
    WHERE u.user_id >= ANY (
      SELECT s.user_id FROM sales s WHERE s.quantity >= 3
    )
  `);
  // Should return users whose ID >= any user ID that has sales with quantity >= 3
  expect(results.length).toBeGreaterThan(0);
});

runner.test('<= ANY with literal array', () => {
  const results = engine.executeQuery(`
    SELECT * FROM sales 
    WHERE quantity <= ANY (ARRAY[1, 2, 3])
  `);
  // Should return sales where quantity <= at least one of 1, 2, or 3
  expect(results.length).toBeGreaterThan(0);
  results.forEach(sale => {
    expect(sale.quantity <= 1 || sale.quantity <= 2 || sale.quantity <= 3).toBe(true);
  });
});

runner.test('IN ANY equivalent test', () => {
  const anyResults = engine.executeQuery(`
    SELECT * FROM products 
    WHERE category = ANY (ARRAY['Electronics', 'Books'])
  `);
  
  const inResults = engine.executeQuery(`
    SELECT * FROM products 
    WHERE category IN ('Electronics', 'Books')
  `);
  
  // =ANY should behave similar to IN for equality checks
  expect(anyResults).toEqual(inResults);
});

runner.test('Complex ANY with JOIN', () => {
  const results = engine.executeQuery(`
    SELECT DISTINCT u.name, u.user_id
    FROM users u
    JOIN sales s ON u.user_id = s.user_id
    WHERE s.product_id = ANY (
      SELECT p.product_id 
      FROM products p 
      WHERE p.category = 'Electronics'
    )
  `);
  // Should return users who bought electronics products
  expect(results.length).toBeGreaterThan(0);
  results.forEach(user => {
    // Verify user has bought at least one electronics product
    const userElectronicsPurchases = engine.executeQuery(`
      SELECT COUNT(*) as count
      FROM sales s
      JOIN products p ON s.product_id = p.product_id
      WHERE s.user_id = ${user.user_id} AND p.category = 'Electronics'
    `);
    expect(userElectronicsPurchases[0].count).toBeGreaterThan(0);
  });
});

runner.test('ANY with NULL values', () => {
  // Test behavior when array contains NULL
  const results = engine.executeQuery(`
    SELECT * FROM products 
    WHERE price = ANY (ARRAY[NULL, 100, 200])
  `);
  // Should handle NULL appropriately - only match 100 and 200
  results.forEach(product => {
    expect([100, 200].includes(product.price)).toBe(true);
  });
});

runner.test('ANY with empty array', () => {
  // Test edge case of empty array
  const results = engine.executeQuery(`
    SELECT * FROM products 
    WHERE price = ANY (ARRAY[])
  `);
  // Should return no results for empty array
  expect(results).toHaveLength(0);
});

runner.test('ANY vs ALL comparison', () => {
  // Compare ANY vs ALL behavior
  const anyResults = engine.executeQuery(`
    SELECT * FROM products 
    WHERE price > ANY (ARRAY[50, 100, 150])
  `);
  
  const allResults = engine.executeQuery(`
    SELECT * FROM products 
    WHERE price > ALL (ARRAY[50, 100, 150])
  `);
  
  // ANY should return more results than ALL (ANY: > at least one, ALL: > all)
  expect(anyResults.length).toBeGreaterThan(allResults.length);
  
  // ALL results should be subset of ANY results
  allResults.forEach(product => {
    expect(product.price > 150).toBe(true); // Must be > all values
  });
});

// Run all tests
runner.run();