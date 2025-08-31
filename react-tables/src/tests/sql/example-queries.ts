// Example SQL queries for testing the SQL engine

export const basicQueries = [
  {
    name: 'Select all from products',
    sql: 'SELECT * FROM products',
    description: 'Retrieves all products'
  },
  {
    name: 'Select specific columns',
    sql: 'SELECT product_id, name, price FROM products',
    description: 'Retrieves specific columns from products'
  },
  {
    name: 'Filter with WHERE',
    sql: 'SELECT * FROM products WHERE price > 100',
    description: 'Products with price greater than 100'
  },
  {
    name: 'Filter with multiple conditions',
    sql: "SELECT * FROM products WHERE category = 'Electronics' AND price < 300",
    description: 'Electronics products under $300'
  }
];

export const joinQueries = [
  {
    name: 'Simple INNER JOIN',
    sql: 'SELECT * FROM sales JOIN products ON sales.product_id = products.product_id',
    description: 'Join sales with products'
  },
  {
    name: 'JOIN with selected columns',
    sql: `SELECT 
      sales.sale_id, 
      products.name, 
      sales.quantity, 
      products.price,
      sales.quantity * products.price as total
    FROM sales 
    JOIN products ON sales.product_id = products.product_id`,
    description: 'Sales with product details and calculated total'
  },
  {
    name: 'Three-way JOIN',
    sql: `SELECT 
      users.name as customer_name,
      products.name as product_name,
      sales.quantity,
      sales.sale_date
    FROM sales
    JOIN users ON sales.user_id = users.user_id
    JOIN products ON sales.product_id = products.product_id`,
    description: 'Complete sales information with user and product names'
  },
  {
    name: 'LEFT JOIN',
    sql: `SELECT 
      products.name,
      sales.quantity
    FROM products
    LEFT JOIN sales ON products.product_id = sales.product_id`,
    description: 'All products with their sales (if any)'
  }
];

export const aggregationQueries = [
  {
    name: 'COUNT all records',
    sql: 'SELECT COUNT(*) FROM sales',
    description: 'Total number of sales'
  },
  {
    name: 'SUM with GROUP BY',
    sql: 'SELECT product_id, SUM(quantity) FROM sales GROUP BY product_id',
    description: 'Total quantity sold per product'
  },
  {
    name: 'AVG with GROUP BY',
    sql: 'SELECT product_id, AVG(quantity) FROM sales GROUP BY product_id',
    description: 'Average quantity per sale for each product'
  },
  {
    name: 'Multiple aggregations',
    sql: `SELECT 
      product_id,
      COUNT(*) as num_sales,
      SUM(quantity) as total_quantity,
      AVG(quantity) as avg_quantity,
      MIN(quantity) as min_quantity,
      MAX(quantity) as max_quantity
    FROM sales 
    GROUP BY product_id`,
    description: 'Complete sales statistics per product'
  },
  {
    name: 'Aggregation with JOIN',
    sql: `SELECT 
      products.name,
      COUNT(sales.sale_id) as num_sales,
      SUM(sales.quantity) as total_sold
    FROM products
    LEFT JOIN sales ON products.product_id = sales.product_id
    GROUP BY products.product_id, products.name`,
    description: 'Product sales summary'
  }
];

export const subqueryQueries = [
  {
    name: 'Simple subquery',
    sql: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)',
    description: 'Products priced above average'
  },
  {
    name: 'Correlated subquery',
    sql: `SELECT s1.sale_id, s1.product_id, s1.quantity
    FROM sales s1
    WHERE s1.quantity > (
      SELECT AVG(s2.quantity)
      FROM sales s2
      WHERE s2.product_id = s1.product_id
    )`,
    description: 'Sales with quantity above average for their product'
  },
  {
    name: 'IN subquery',
    sql: `SELECT * FROM products 
    WHERE product_id IN (
      SELECT product_id FROM sales WHERE quantity > 5
    )`,
    description: 'Products that have been sold in quantities greater than 5'
  },
  {
    name: 'EXISTS subquery',
    sql: `SELECT * FROM users u
    WHERE EXISTS (
      SELECT 1 FROM sales s WHERE s.user_id = u.user_id
    )`,
    description: 'Users who have made at least one purchase'
  }
];

export const allQueries = [
  ...basicQueries,
  ...joinQueries,
  ...aggregationQueries,
  ...subqueryQueries
];