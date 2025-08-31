// Test data for react-tables
// This data is designed to test SQL features including JOINs and aggregations

function getRandomNumber(min: number, max: number): number | null {
  if (Math.random() < 0.15) {
    return null;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Products table
export const PRODUCTS_COLUMNS = [
  { key: 'product_id', type: 'number' as const },
  { key: 'name', type: 'string' as const },
  { key: 'category', type: 'string' as const },
  { key: 'price', type: 'number' as const }
];

export const PRODUCTS_RECORDS = Array.from({ length: 20 }, (_, i) => ({
  product_id: i + 1,
  name: `Product ${getRandomString(6)}`,
  category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
  price: getRandomNumber(10, 500)
}));

// Sales table with foreign keys to products and users
export const SALES_COLUMNS = [
  { key: 'sale_id', type: 'number' as const },
  { key: 'product_id', type: 'number' as const },
  { key: 'user_id', type: 'number' as const },
  { key: 'quantity', type: 'number' as const },
  { key: 'sale_date', type: 'string' as const }
];

export const SALES_RECORDS = Array.from({ length: 100 }, (_, i) => ({
  sale_id: i + 1,
  product_id: getRandomNumber(1, 20),
  user_id: getRandomNumber(1, 50),
  quantity: getRandomNumber(1, 10),
  sale_date: `2024-${String(getRandomNumber(1, 12))?.padStart(2, '0')}-${String(getRandomNumber(1, 28))?.padStart(2, '0')}`
}));

// Users table
export const USER_COLUMNS = [
  { key: 'user_id', type: 'number' as const },
  { key: 'name', type: 'string' as const },
  { key: 'email', type: 'string' as const },
  { key: 'status', type: 'string' as const }
];

export const USER_RECORDS = Array.from({ length: 50 }, (_, i) => ({
  user_id: i + 1,
  name: `User ${getRandomString(5)}`,
  email: `${getRandomString(8)}@example.com`,
  status: Math.random() > 0.3 ? 'Active' : 'Inactive'
}));

// Export as example tables for testing
export const exampleTables = [
  {
    name: 'products',
    columns: PRODUCTS_COLUMNS,
    records: PRODUCTS_RECORDS
  },
  {
    name: 'sales',
    columns: SALES_COLUMNS,
    records: SALES_RECORDS
  },
  {
    name: 'users',
    columns: USER_COLUMNS,
    records: USER_RECORDS
  }
];

// Export individual tables for convenience
export const productsTable = {
  name: 'products',
  columns: PRODUCTS_COLUMNS,
  records: PRODUCTS_RECORDS
};

export const salesTable = {
  name: 'sales',
  columns: SALES_COLUMNS,
  records: SALES_RECORDS
};

export const usersTable = {
  name: 'users',
  columns: USER_COLUMNS,
  records: USER_RECORDS
};