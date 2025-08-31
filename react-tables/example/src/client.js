import { h, render } from 'preact';
import { DataTable, Database } from '@rare-earth/react-tables';
import { useState } from 'preact/hooks';

const App = function(){

  function getRandomNumber(min, max) {
    if (Math.random() < 0.15){
      return null;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to generate a random string of given length
  function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Generate sample data for multiple tables with relational structure
  const PRODUCTS_COLUMNS = [
    { key: 'product_id', label: 'Product ID', type: 'number' },
    { key: 'name', label: 'Product Name', type: 'string' },
    { key: 'category', label: 'Category', type: 'string' },
    { key: 'price', label: 'Price', type: 'number' }
  ];

  const PRODUCTS_RECORDS = Array.from({ length: 20 }, (_, i) => ({
    product_id: i + 1,
    name: `Product ${getRandomString(6)}`,
    category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
    price: getRandomNumber(10, 500)
  }));

  const SALES_COLUMNS = [
    { key: 'sale_id', label: 'Sale ID', type: 'number' },
    { key: 'product_id', label: 'Product ID', type: 'number' },
    { key: 'user_id', label: 'User ID', type: 'number' },
    { key: 'quantity', label: 'Quantity', type: 'number' },
    { key: 'sale_date', label: 'Sale Date', type: 'string' }
  ];

  const SALES_RECORDS = Array.from({ length: 100 }, (_, i) => ({
    sale_id: i + 1,
    product_id: getRandomNumber(1, 20),
    user_id: getRandomNumber(1, 50),
    quantity: getRandomNumber(1, 10),
    sale_date: `2024-${String(getRandomNumber(1, 12)).padStart(2, '0')}-${String(getRandomNumber(1, 28)).padStart(2, '0')}`
  }));

  const USER_COLUMNS = [
    { key: 'user_id', label: 'User ID', type: 'number' },
    { key: 'name', label: 'Name', type: 'string' },
    { key: 'email', label: 'Email', type: 'string' },
    { key: 'status', label: 'Status', type: 'string' }
  ];

  const USER_RECORDS = Array.from({ length: 50 }, (_, i) => ({
    user_id: i + 1,
    name: `User ${getRandomString(5)}`,
    email: `${getRandomString(8)}@example.com`,
    status: Math.random() > 0.3 ? 'Active' : 'Inactive'
  }));

  const [showDatabase, setShowDatabase] = useState(true);
  // These are the base tables passed as props - they cannot be deleted or renamed
  const baseTables = [
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

  return(
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowDatabase(!showDatabase)}>
          Toggle View: {showDatabase ? 'Database' : 'Single Table'}
        </button>
      </div>

      {showDatabase ? (
        <Database
          tables={baseTables}
          darkMode={false}
          allowAddTable={true}
          onTableChange={(tableName) => console.log('Active table:', tableName)}
        />
      ) : (
        <DataTable
          // darkMode={true}
          index={true}
          columns={SALES_COLUMNS}
          records={SALES_RECORDS}
        />
      )}
    </div>
  );
}
render(<App />, document.getElementById("root"));
