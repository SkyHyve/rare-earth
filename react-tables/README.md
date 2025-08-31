# @rare-earth/react-tables

A feature-rich, lightweight React table component with advanced sorting, filtering, pagination, and data export capabilities.

## Features

- 🚀 **Zero-config setup** - Works out of the box with minimal configuration
- 🔍 **Advanced filtering** - String and numeric filters with regex support
- 📊 **Multi-column sorting** - Sort by multiple columns with visual indicators
- 📄 **Pagination** - Built-in pagination with customizable page sizes
- 💾 **Data export** - Export filtered data to CSV
- 🎯 **Column management** - Drag & drop column reordering
- 🎨 **Customizable** - Flexible styling with light/dark mode support
- 📱 **Responsive** - Mobile-friendly design
- ⚡ **Performance optimized** - Efficient rendering with React hooks
- 🔧 **TypeScript support** - Full TypeScript definitions included
- 🔒 **CSP Compliant** - Works with strict Content Security Policy
- 📊 **Enhanced Index Column** - Dual index display showing source and current positions
- 💡 **Helpful Tooltips** - Context-sensitive help throughout the interface
- 🗄️ **Database Component** - Multi-table interface with SQL querying capabilities
- 🔍 **SQL Engine** - Client-side SQL processing with JOIN, aggregation, and subquery support

## Installation

```bash
npm install @rare-earth/react-tables
```

## Quick Start

```jsx
import React from 'react';
import { DataTable, Database } from '@rare-earth/react-tables';
import '@rare-earth/react-tables/dist/css/react-tables.css';

const App = () => {
  const columns = [
    {
      key: 'name',
      label: 'Name',
      type: 'string'
    },
    {
      key: 'age', 
      label: 'Age',
      type: 'number'
    },
    {
      key: 'email',
      label: 'Email',
      type: 'string'
    }
  ];

  const records = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
  ];

  return (
    <DataTable
      columns={columns}
      records={records}
    />
  );
};

export default App;
```

## API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDefinition[]` | **required** | Array of column definitions |
| `records` | `any[]` | **required** | Array of data records |
| `id` | `string` | - | HTML id attribute for the table container |
| `className` | `string` | - | CSS class name for the table container |
| `style` | `React.CSSProperties` | - | Inline styles for the table container |
| `initialPage` | `number` | `1` | Initial page number |
| `initialPageLength` | `number` | `20` | Initial number of records per page |
| `pageLengthChoices` | `number[]` | `[10, 20, 50, 100, Infinity]` | Available page size options |
| `initialSortFields` | `SortField[]` | `[]` | Initial sort configuration |
| `debounceTime` | `number` | `500` | Debounce time for search inputs (ms) |
| `index` | `boolean` | `true` | Show row index column with Source/Current sub-headers |
| `darkMode` | `boolean` | `false` | Enable dark mode styling |
| `onExport` | `(data: any[]) => void` | - | Custom export handler |

### ColumnDefinition

```typescript
interface ColumnDefinition {
  key: string;                                    // Unique column identifier
  label?: string;                                 // Display label (defaults to key)
  type?: 'string' | 'number' | 'boolean' | 'date'; // Data type for filtering/sorting
  valueFunc?: (record: any) => any;               // Custom value extractor
  displayFunc?: (record: any, value: any) => React.ReactNode; // Custom display renderer
  compareFunc?: (a: any, b: any) => number;      // Custom sort comparator
}
```

### SortField

```typescript
interface SortField {
  key: string;     // Column key to sort by
  reverse: boolean; // Sort direction (false = ascending, true = descending)
}
```

## Advanced Usage

### Custom Value and Display Functions

```jsx
const columns = [
  {
    key: 'user',
    label: 'User Info',
    type: 'string',
    valueFunc: (record) => `${record.firstName} ${record.lastName}`,
    displayFunc: (record, value) => (
      <div>
        <strong>{value}</strong>
        <br />
        <small>{record.email}</small>
      </div>
    )
  },
  {
    key: 'salary',
    label: 'Salary',
    type: 'number',
    displayFunc: (record, value) => (
      <span style={{ color: value > 50000 ? 'green' : 'red' }}>
        ${value?.toLocaleString()}
      </span>
    )
  }
];
```

### Custom Export Handler

```jsx
<DataTable
  columns={columns}
  records={records}
  onExport={(filteredData) => {
    // Custom export logic
    console.log('Exporting:', filteredData);
    // Could send to API, generate PDF, etc.
  }}
/>
```

### Initial Sort Configuration

```jsx
<DataTable
  columns={columns}
  records={records}
  initialSortFields={[
    { key: 'name', reverse: false },    // Sort by name ascending
    { key: 'age', reverse: true }       // Then by age descending
  ]}
/>
```

## Filtering

The table supports advanced filtering capabilities:

### String Filters
- **Text search** - Basic substring matching
- **Case sensitive** - Optional case-sensitive matching
- **Regex** - Regular expression support
- **Trim whitespace** - Automatic whitespace trimming

### Number Filters
- **Range filtering** - Greater than/less than with inclusive/exclusive options
- **Non-numeric handling** - Option to include/exclude non-numeric values

### Global Search
Use the main search box to search across all columns simultaneously.

## Sorting

- **Single column** - Click column headers to sort
- **Multi-column** - Hold Shift and click to add secondary sorts
- **Visual indicators** - Arrows show sort direction and order
- **Custom comparators** - Define custom sort logic per column

## Database Component

The `Database` component provides a powerful multi-table interface for complex data analysis with SQL querying capabilities.

### Basic Database Usage

```jsx
import React from 'react';
import { Database } from '@rare-earth/react-tables';
import '@rare-earth/react-tables/dist/css/react-tables.css';

const App = () => {
  const tables = [
    {
      name: 'products',
      columns: [
        { key: 'product_id', label: 'ID', type: 'number' },
        { key: 'name', label: 'Product Name', type: 'string' },
        { key: 'category', label: 'Category', type: 'string' },
        { key: 'price', label: 'Price', type: 'number' }
      ],
      records: [
        { product_id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1200 },
        { product_id: 2, name: 'Smartphone', category: 'Electronics', price: 800 },
        { product_id: 3, name: 'Novel', category: 'Books', price: 25 }
      ]
    },
    {
      name: 'sales',
      columns: [
        { key: 'sale_id', label: 'Sale ID', type: 'number' },
        { key: 'product_id', label: 'Product ID', type: 'number' },
        { key: 'quantity', label: 'Quantity', type: 'number' },
        { key: 'sale_date', label: 'Date', type: 'string' }
      ],
      records: [
        { sale_id: 1, product_id: 1, quantity: 2, sale_date: '2024-01-15' },
        { sale_id: 2, product_id: 2, quantity: 1, sale_date: '2024-01-16' }
      ]
    }
  ];

  return (
    <Database
      tables={tables}
      defaultTable="products"
      allowAddTable={true}
      darkMode={false}
    />
  );
};
```

### Database Features

#### **Multi-Table Interface**
- Browse multiple related tables with tab navigation
- Switch between tables seamlessly
- Visual indicators for table relationships

#### **SQL Query Builder**
- Interactive SQL query interface
- Real-time query validation and error reporting
- Schema browser showing all available tables and columns
- Support for complex SQL operations:
  - `SELECT` with column selection and aliases
  - `JOIN` operations (INNER, LEFT, RIGHT)
  - `WHERE` clauses with comparison operators
  - `GROUP BY` with aggregate functions
  - `ORDER BY` for result sorting
  - Subqueries and correlated queries
  - `=ANY()`, `!=ANY()`, `>ANY()`, etc. operations

#### **Dynamic Table Creation**
- Create new tables from SQL query results
- Automatic column type inference
- Table management (rename, delete)
- Validation for SQL identifiers

#### **Client-Side SQL Engine**
- Pure JavaScript implementation (no server required)
- CSP compliant (no eval or unsafe operations)
- Support for complex analytical queries
- Real-time query execution

### Database Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tables` | `TableConfig[]` | **required** | Array of table configurations |
| `id` | `string` | - | HTML id attribute for the database container |
| `defaultTable` | `string` | - | Initially active table name |
| `darkMode` | `boolean` | `false` | Enable dark mode styling |
| `debounceTime` | `number` | `500` | Debounce time for search inputs (ms) |
| `onTableChange` | `(tableName: string) => void` | - | Callback when active table changes |
| `allowAddTable` | `boolean` | `false` | Allow creating new tables from SQL queries |
| `onDatabaseReady` | `(db: SQLEngine) => void` | - | Callback when SQL engine is initialized |

### TableConfig

```typescript
interface TableConfig {
  name: string;                          // Table identifier
  columns: DatabaseColumnDefinition[];   // Column definitions
  records: any[];                        // Table data
  initialPage?: number;                  // Starting page
  initialPageLength?: number;            // Records per page
  pageLengthChoices?: number[];          // Available page sizes
  initialSortFields?: SortField[];       // Initial sort configuration
  onExport?: (data: any[]) => void;     // Custom export handler
  index?: boolean;                       // Show index column
  deletable?: boolean;                   // Allow table deletion (for query-created tables)
}
```

### SQL Query Examples

#### **Basic Queries**
```sql
-- Select all products
SELECT * FROM products;

-- Filter by category
SELECT * FROM products WHERE category = 'Electronics';

-- Price range filtering
SELECT * FROM products WHERE price BETWEEN 100 AND 500;
```

#### **JOIN Operations**
```sql
-- Products with their sales
SELECT p.name, s.quantity, s.sale_date
FROM products p
JOIN sales s ON p.product_id = s.product_id;

-- High-value sales with product details
SELECT p.name, p.price, s.quantity, (p.price * s.quantity) as total
FROM products p
JOIN sales s ON p.product_id = s.product_id
WHERE (p.price * s.quantity) > 1000;
```

#### **Aggregate Queries**
```sql
-- Sales summary by category
SELECT p.category, COUNT(*) as sales_count, SUM(s.quantity) as total_quantity
FROM products p
JOIN sales s ON p.product_id = s.product_id
GROUP BY p.category;

-- Average price by category
SELECT category, AVG(price) as avg_price, COUNT(*) as product_count
FROM products
GROUP BY category
ORDER BY avg_price DESC;
```

#### **=ANY() Operations**
```sql
-- Products in specific categories
SELECT * FROM products 
WHERE category = ANY (ARRAY['Electronics', 'Books']);

-- Products with high-quantity sales
SELECT * FROM products p
WHERE p.product_id = ANY (
  SELECT s.product_id FROM sales s WHERE s.quantity > 2
);

-- Price comparisons with ANY
SELECT * FROM products 
WHERE price > ANY (ARRAY[100, 200, 300]);
```

#### **Subqueries**
```sql
-- Products above average price
SELECT * FROM products 
WHERE price > (SELECT AVG(price) FROM products);

-- Products with no sales
SELECT * FROM products p
WHERE NOT EXISTS (
  SELECT 1 FROM sales s WHERE s.product_id = p.product_id
);
```

### Database Accessibility

The Database component includes comprehensive accessibility features:
- **ARIA compliance** - Full WCAG 2.1 AA support
- **Keyboard navigation** - Tab, Enter, Escape key support
- **Screen reader support** - Descriptive labels and live regions
- **Focus management** - Modal focus trapping
- **Responsive design** - Adaptive layouts for all screen sizes

## Styling

### Dark Mode Support

Both DataTable and Database components include built-in dark mode support. Enable it using the `darkMode` prop:

```jsx
<DataTable 
  darkMode={true}
  columns={columns}
  records={records}
/>

<Database
  darkMode={true}
  tables={tables}
  allowAddTable={true}
/>
```

### Row Striping

The table features enhanced alternating row colors:
- Even rows have a subtle background color
- Every 4th row gets a darker background for better visual separation
- Hover effects provide interactive feedback

### Custom Theming

The component uses CSS custom properties for easy theming:

```css
/* Light mode variables (default) */
.rare-earth-container {
  --rare-earth-table-bg: white;
  --rare-earth-table-stripe-bg: #f1f5f9;
  --rare-earth-table-stripe-darker: #e2e8f0;
  --rare-earth-table-text: #374151;
  --rare-earth-input-bg: white;
  /* ... more variables */
}

/* Dark mode variables */
.rare-earth-container.dark-mode {
  --rare-earth-table-bg: #1f2937;
  --rare-earth-table-stripe-bg: #374151;
  --rare-earth-table-stripe-darker: #4b5563;
  --rare-earth-table-text: #f9fafb;
  --rare-earth-input-bg: #374151;
  /* ... more variables */
}

/* Override any variable for custom themes */
.my-custom-theme {
  --rare-earth-primary-gradient: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
  --rare-earth-table-stripe-bg: #fff5f5;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our [GitHub repository](https://github.com/SkyHyve/rare-earth).

## License

MIT © Matthew LW Graham

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a complete list of changes and version history.

---

For more examples and documentation, visit our [GitHub repository](https://github.com/SkyHyve/rare-earth).