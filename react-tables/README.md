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

## Installation

```bash
npm install @rare-earth/react-tables
```

## Quick Start

```jsx
import React from 'react';
import { DataTable } from '@rare-earth/react-tables';
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
| `onExport` | `(data: any[]) => void` | - | Custom export handler |

### Theming Props

The `className` prop can be used to apply themes:

| Theme Class | Description |
|-------------|-------------|
| `dark-mode` | Applies dark theme styling |
| Custom classes | Override CSS custom properties for custom themes |

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

## Styling

### Dark Mode Support

The table includes built-in dark mode support. Enable it by adding the `dark-mode` class:

```jsx
<DataTable 
  className="dark-mode"
  columns={columns}
  records={records}
/>
```

Or toggle programmatically:
```javascript
document.querySelector('.rare-earth-container').classList.toggle('dark-mode');
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