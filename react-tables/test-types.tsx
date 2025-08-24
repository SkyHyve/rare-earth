import React from 'react';
import { DataTable } from './src/Table';

// This file tests that TypeScript types are working correctly
const TestComponent: React.FC = () => {
  const columns = [
    { key: 'id', label: 'ID', type: 'number' as const },
    { key: 'name', label: 'Name', type: 'string' as const },
  ];

  const records = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ];

  return (
    <DataTable
      columns={columns}
      records={records}
      initialPageLength={10}
      initialPage={1}
    />
  );
};

export default TestComponent;