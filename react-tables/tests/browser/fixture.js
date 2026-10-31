import React from 'react';
import { createRoot } from 'react-dom/client';
import { DataTable, Database } from '../../dist/bundle.esm';

const records = Array.from({ length: 25 }, (_, index) => ({
  prefix: `192.0.2.${index + 1}/32`,
  description: index % 2 ? 'Branch' : 'Office',
  count: index + 1,
}));
const columns = [
  {
    key: 'prefix',
    label: 'Address',
    type: 'string',
    displayFunc: (record) => React.createElement('a', { href: '#address' }, record.prefix),
  },
  { key: 'description', label: 'Description', type: 'string' },
  { key: 'count', type: 'number' },
];

createRoot(document.getElementById('root')).render(
  React.createElement(React.Fragment, null,
    React.createElement(Database, {
      tables: [{ name: 'IPAM', columns, records, initialPageLength: 10 }],
      allowAddTable: true,
      debounceTime: 10,
    }),
    React.createElement(DataTable, {
      id: 'standalone',
      tableName: 'Standalone addresses',
      columns,
      records,
      index: false,
      initialPageLength: 10,
      debounceTime: 10,
    }),
  ),
);
