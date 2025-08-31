import React from 'react';
import { DataTable } from './DataTable';
import { ColumnDefinition, DatabaseColumnDefinition } from './types';
import { SQLEngine } from './sql-engine';
import { isValidSQLIdentifier } from './sql/validator';
import { FloatingTooltip } from './FloatingTooltip';
import { TbTableExport } from 'react-icons/tb';
import * as XLSX from 'xlsx';

interface TableConfig {
  name: string;
  columns: DatabaseColumnDefinition[];
  records: any[];
  initialPage?: number;
  initialPageLength?: number;
  pageLengthChoices?: number[];
  initialSortFields?: any[];
  onExport?: (data: any[]) => void;
  index?: boolean;
  deletable?: boolean;
}

interface DatabaseProps {
  id?: string;
  tables: TableConfig[];
  defaultTable?: string;
  darkMode?: boolean;
  debounceTime?: number;
  onTableChange?: (tableName: string) => void;
  allowAddTable?: boolean;
  onDatabaseReady?: (db: any) => void;
}

export interface DatabaseHandle {
  getDatabase: () => any | null;
  executeSQL: (sql: string) => any[];
  getTableData: (tableName: string) => any[];
}

const Database = React.forwardRef<HTMLDivElement, DatabaseProps>((props, ref) => {
  const [activeTableId, setActiveTableId] = React.useState(
    props.defaultTable || (props.tables.length > 0 ? props.tables[0].name : '')
  );
  const [queryTables, setQueryTables] = React.useState<TableConfig[]>([]);
  const [renamingTableId, setRenamingTableId] = React.useState<string | null>(null);
  const [renameValue, setRenameValue] = React.useState('');
  const [conn, setConn] = React.useState<any>(null);
  const [showAddTablePopover, setShowAddTablePopover] = React.useState(false);
  const [showTableSchema, setShowTableSchema] = React.useState(false);
  
  // Refs for focus management
  const modalRef = React.useRef<HTMLDivElement>(null);
  const tableNameInputRef = React.useRef<HTMLInputElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const [newTableName, setNewTableName] = React.useState('');
  const [newTableQuery, setNewTableQuery] = React.useState('');
  const [queryError, setQueryError] = React.useState<string | null>(null);
  const [renameError, setRenameError] = React.useState<string | null>(null);
  const [dbLoading, setDbLoading] = React.useState(true);
  const [exportingAll, setExportingAll] = React.useState(false);

  // Combine props.tables and queryTables for display
  const allTables = React.useMemo(() => [...props.tables, ...queryTables], [props.tables, queryTables]);

  // Initialize SQL engine
  React.useEffect(() => {
    // Create pure JavaScript SQL engine (CSP-safe)
    const database = new SQLEngine();
    
    setConn(database);
    setDbLoading(false);
    
    if (props.onDatabaseReady) {
      props.onDatabaseReady(database);
    }
  }, [props.onDatabaseReady]);

  // Sync tables with SQL engine
  React.useEffect(() => {
    if (!conn || dbLoading){
      return
    };

    // Register tables with the SQL engine
    for (const table of allTables) {
      const columns: { [key: string]: 'TEXT' | 'REAL' } = {};
      table.columns.forEach(col => {
        columns[col.key] = col.type === 'number' ? 'REAL' : 'TEXT';
      });
      
      conn.setTable(table.name, columns, table.records || []);
    }
  }, [allTables, conn, dbLoading]);

  const handleTableChange = (tableName: string) => {
    setActiveTableId(tableName);
    if (props.onTableChange) {
      props.onTableChange(tableName);
    }
  };

  const handleAddTable = () => {
    setShowAddTablePopover(true);
    setShowTableSchema(false);
    setNewTableName('');
    setNewTableQuery('');
    setQueryError(null);
  };
  
  // Focus management for modal
  React.useEffect(() => {
    if (showAddTablePopover && tableNameInputRef.current) {
      tableNameInputRef.current.focus();
    }
  }, [showAddTablePopover]);
  
  // Handle Escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showAddTablePopover) {
        setShowAddTablePopover(false);
      }
    };
    
    if (showAddTablePopover) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return;
  }, [showAddTablePopover]);
  
  // Trap focus within modal
  React.useEffect(() => {
    if (!showAddTablePopover || !modalRef.current) return;
    
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [showAddTablePopover]);

  const executeNewTableQuery = () => {
    if (!newTableName.trim()) {
      setQueryError('Please enter a table name');
      return;
    }
    if (!newTableQuery.trim()) {
      setQueryError('Please enter a SQL query');
      return;
    }
    if (!conn) {
      setQueryError('Database not ready');
      return;
    }

    try {
      // Execute the SELECT query
      const resultData = conn.executeQuery(newTableQuery);

      // Infer columns from the result
      const columns: ColumnDefinition[] = [];
      if (resultData.length > 0) {
        const firstRow = resultData[0];
        Object.keys(firstRow).forEach(key => {
          const value = firstRow[key];
          columns.push({
            key: key,
            label: key,
            type: typeof value === 'number' ? 'number' : 'string'
          });
        });
      }

      // Validate table name as SQL identifier
      if (!isValidSQLIdentifier(newTableName)) {
        setQueryError(`Invalid table name: "${newTableName}". Table names must be valid SQL identifiers (letters, numbers, underscores only, cannot start with number, cannot be SQL reserved words).`);
        return;
      }

      // Check for duplicate table names
      const allTables = [...props.tables, ...queryTables];
      if (allTables.some(table => table.name === newTableName)) {
        setQueryError(`Table name "${newTableName}" already exists. Please choose a different name.`);
        return;
      }

      // Create new table configuration
      const newTable: TableConfig = {
        name: newTableName,
        columns: columns,
        records: resultData,
        deletable: true
      };

      // Add the new table to queryTables
      setQueryTables([...queryTables, newTable]);
      setActiveTableId(newTable.name);
      setShowAddTablePopover(false);
      setNewTableName('');
      setNewTableQuery('');
      setQueryError(null);
    } catch (error: any) {
      setQueryError(`SQL Error: ${error.message || error}`);
      return;
    }
  };

  const handleRemoveTable = (tableName: string) => {
    // Only allow removing query tables, not prop tables
    const isQueryTable = queryTables.some(t => t.name === tableName);
    
    if (isQueryTable) {
      const newQueryTables = queryTables.filter(t => t.name !== tableName);
      setQueryTables(newQueryTables);
      
      // Update active table if needed
      if (activeTableId === tableName && allTables.length > 1) {
        const remainingTables = allTables.filter(t => t.name !== tableName);
        if (remainingTables.length > 0) {
          setActiveTableId(remainingTables[0].name);
        }
      }
    }
  };

  const startRenaming = (tableName: string) => {
    // Only allow renaming query tables
    const table = queryTables.find(t => t.name === tableName);
    if (table) {
      setRenamingTableId(tableName);
      setRenameValue(table.name);
    }
  };

  const handleRename = (tableName: string) => {
    // Only rename query tables
    const isQueryTable = queryTables.some(t => t.name === tableName);
    
    if (isQueryTable) {
      // Check for duplicate table names (excluding the current table being renamed)
      const allTables = [...props.tables, ...queryTables.filter(t => t.name !== tableName)];
      if (allTables.some(table => table.name === renameValue)) {
        setRenameError(`Table name "${renameValue}" already exists. Please choose a different name.`);
        return;
      }
      
      // Validate the new name as SQL identifier
      if (!isValidSQLIdentifier(renameValue)) {
        setRenameError(`Invalid table name: "${renameValue}". Table names must be valid SQL identifiers.`);
        return;
      }
      
      setQueryTables(queryTables.map(t => 
        t.name === tableName ? { ...t, name: renameValue } : t
      ));
      setRenameError(null);
    }
    setRenamingTableId(null);
  };

  const cancelRename = () => {
    setRenamingTableId(null);
    setRenameValue('');
    setRenameError(null);
  };

  const exportAllTables = React.useCallback(() => {
    if (exportingAll) return;
    
    setExportingAll(true);
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Add each table as a sheet
      allTables.forEach(table => {
        // Create worksheet data
        const wsData = [];
        
        // Add headers
        const headers = table.columns.map(col => col.key);
        wsData.push(headers);
        
        // Add data rows
        if (table.records && Array.isArray(table.records)) {
          table.records.forEach(record => {
            const row = table.columns.map(col => {
              const value = record[col.key];
              return value == null ? '' : value;
            });
            wsData.push(row);
          });
        }
        
        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        
        // Set column widths (auto-fit based on content)
        const colWidths = headers.map((header, i) => {
          let maxWidth = header.length;
          if (table.records) {
            table.records.forEach(record => {
              const value = String(record[table.columns[i].key] || '');
              maxWidth = Math.max(maxWidth, value.length);
            });
          }
          return { wch: Math.min(maxWidth + 2, 50) }; // Cap at 50 characters
        });
        ws['!cols'] = colWidths;
        
        // Add worksheet to workbook with table name as sheet name
        // Excel sheet names have restrictions: max 31 chars, no special chars
        const sheetName = table.name
          .replace(/[\[\]\*\/\\\?:]/g, '_') // Replace invalid characters
          .substring(0, 31); // Limit to 31 characters
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      });
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
      const filename = `database_export_${timestamp}.xlsx`;
      
      // Write the file
      XLSX.writeFile(wb, filename);
      
    } catch (error) {
      console.error('Error exporting all tables:', error);
      alert('Failed to export tables. Please check the console for details.');
    } finally {
      setExportingAll(false);
    }
  }, [allTables, exportingAll]);

  const activeTable = allTables.find(t => t.name === activeTableId);

  if (dbLoading) {
    return (
      <div 
        ref={ref}
        className={`rare-earth-database${props.darkMode ? ' dark-mode' : ''}`}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="rare-earth-database-loading">
          <div aria-label="Loading database">Loading database...</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={`rare-earth-database${props.darkMode ? ' dark-mode' : ''}`}
      role="region"
      aria-label="Database interface"
    >
      {showAddTablePopover && (
        <div 
          className="rare-earth-database-popover-overlay" 
          onClick={() => setShowAddTablePopover(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div 
            ref={modalRef}
            className="rare-earth-database-popover" 
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <h3 id="modal-title">Create New Table from SQL Query</h3>
            <div id="modal-description" className="sr-only">
              Use this form to create a new table by executing a SQL query against the existing tables
            </div>
            <div className="rare-earth-database-popover-field">
              <label htmlFor="table-name-input">Table Name:</label>
              <input
                ref={tableNameInputRef}
                id="table-name-input"
                type="text"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                placeholder="Enter table name..."
                className="rare-earth-database-popover-input"
                aria-required="true"
                aria-invalid={!!queryError && !newTableName.trim()}
                aria-describedby={queryError && !newTableName.trim() ? "table-name-error" : undefined}
              />
              {queryError && !newTableName.trim() && (
                <span id="table-name-error" className="sr-only">
                  Table name is required
                </span>
              )}
            </div>
            
            {/* Collapsible Table Schema Section */}
            <div className="rare-earth-database-schema-section">
              <button
                type="button"
                onClick={() => setShowTableSchema(!showTableSchema)}
                className={`rare-earth-database-schema-toggle${showTableSchema ? ' active' : ''}`}
                aria-expanded={showTableSchema}
                aria-controls="table-schema-panel"
                aria-label={`${showTableSchema ? 'Hide' : 'Show'} available tables and columns`}
              >
                <span>Available Tables & Columns</span>
                <span className={`rare-earth-database-schema-toggle-arrow${showTableSchema ? ' active' : ''}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>
              
              <div 
                id="table-schema-panel"
                className={`rare-earth-database-schema-content${showTableSchema ? ' active' : ''}`}
                role="region"
                aria-label="Database schema"
                aria-hidden={!showTableSchema}
              >
                  {allTables.map(table => (
                    <div
                      key={table.name}
                      className="rare-earth-database-table-card"
                      role="group"
                      aria-label={`Table: ${table.name}`}
                    >
                      <div className="rare-earth-database-table-name"
                        role="heading"
                        aria-level={4}
                      >
                        {table.name}
                      </div>
                      <div className="rare-earth-database-column-list"
                        role="list"
                        aria-label={`Columns in ${table.name}`}
                      >
                        {table.columns.map(col => (
                          <div key={col.key} className="rare-earth-database-column-item"
                            role="listitem"
                          >
                            <span className="rare-earth-database-column-bullet" aria-hidden="true">•</span> 
                            <span aria-label={`Column ${col.key} of type ${col.type || 'string'}`}>
                              {col.key} 
                              <span className="rare-earth-database-column-type">
                                ({col.type || 'string'})
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            
            <div className="rare-earth-database-popover-field">
              <label htmlFor="sql-query-input">SQL Query:</label>
              <textarea
                id="sql-query-input"
                value={newTableQuery}
                onChange={(e) => setNewTableQuery(e.target.value)}
                placeholder="Enter SQL query (e.g., SELECT * FROM ...)"
                className="rare-earth-database-popover-textarea"
                rows={8}
                aria-required="true"
                aria-invalid={!!queryError && !newTableQuery.trim()}
                aria-describedby={queryError ? "query-error" : "query-help"}
              />
              <span id="query-help" className="sr-only">
                Write a SELECT statement to query data from the available tables
              </span>
            </div>
            {queryError && (
              <div 
                id="query-error"
                className="rare-earth-database-popover-error"
                role="alert"
                aria-live="assertive"
              >
                {queryError}
              </div>
            )}
            <div className="rare-earth-database-popover-buttons">
              <button
                onClick={executeNewTableQuery}
                className="rare-earth-database-popover-button primary"
                aria-label="Execute SQL query and create new table"
              >
                Execute & Create Table
              </button>
              <button
                ref={closeButtonRef}
                onClick={() => setShowAddTablePopover(false)}
                className="rare-earth-database-popover-button"
                aria-label="Cancel and close dialog"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="rare-earth-database-header">
        {renameError && renamingTableId && (
          <div 
            className="rare-earth-database-error"
            role="alert"
            aria-live="assertive"
          >
            {renameError}
          </div>
        )}
        <div 
          className="rare-earth-database-tabs"
          role="tablist"
          aria-label="Database tables"
        >
          {allTables.length > 0 && (
            <FloatingTooltip content="Export all tables to Excel file (.xlsx) with each table as a separate sheet">
              <button
                onClick={exportAllTables}
                className="rare-earth-database-export-all-button"
                aria-label="Export all tables to Excel file"
                disabled={exportingAll}
              >
                <TbTableExport size="1.1rem" />
                <span>{exportingAll ? 'Exporting...' : 'Export All'}</span>
              </button>
            </FloatingTooltip>
          )}
          
          {allTables.map(table => {
            const isQueryTable = queryTables.some(t => t.name === table.name);
            return (
            <div 
              key={table.name}
              className={`rare-earth-database-tab${activeTableId === table.name ? ' active' : ''}`}
              role="presentation"
            >
              {renamingTableId === table.name ? (
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={() => cancelRename()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRename(table.name);
                    } else if (e.key === 'Escape') {
                      cancelRename();
                    }
                  }}
                  autoFocus
                  className="rare-earth-database-rename-input"
                  aria-label={`Rename table ${table.name}`}
                  aria-invalid={!!renameError}
                  aria-describedby={renameError ? "rename-error" : undefined}
                />
              ) : (
                <button
                  onClick={() => handleTableChange(table.name)}
                  className="rare-earth-database-tab-button"
                  role="tab"
                  aria-selected={activeTableId === table.name}
                  aria-controls={`tabpanel-${table.name}`}
                  id={`tab-${table.name}`}
                  tabIndex={activeTableId === table.name ? 0 : -1}
                >
                  {table.name}
                </button>
              )}
              
              <div className="rare-earth-database-tab-actions" role="group" aria-label="Table actions">
                {isQueryTable && (
                  <button
                    onClick={() => startRenaming(table.name)}
                    className="rare-earth-database-action-button"
                    title="Rename table"
                    aria-label={`Rename table ${table.name}`}
                  >
                    <span aria-hidden="true">✏️</span>
                    <span className="sr-only">Rename</span>
                  </button>
                )}
                {isQueryTable && allTables.length > 1 && (
                  <button
                    onClick={() => handleRemoveTable(table.name)}
                    className="rare-earth-database-action-button"
                    title="Remove table"
                    aria-label={`Remove table ${table.name}`}
                  >
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Remove</span>
                  </button>
                )}
              </div>
            </div>
            );
          })}
          
          {props.allowAddTable && (
            <button
              onClick={handleAddTable}
              className="rare-earth-database-add-button"
              title="Add new table"
              aria-label="Add new table from SQL query"
            >
              <span aria-hidden="true">+</span> Add Table
            </button>
          )}
        </div>
      </div>
      
      <div 
        className="rare-earth-database-content"
        role="tabpanel"
        id={`tabpanel-${activeTableId}`}
        aria-labelledby={`tab-${activeTableId}`}
      >
        {activeTable && (
          <DataTable
            key={activeTable.name}
            id={activeTable.name}
            columns={activeTable.columns.map((col): ColumnDefinition => ({
              ...col,
              label: col.key,
              typeToggleable: false
            }))}
            records={activeTable.records}
            initialPage={activeTable.initialPage}
            initialPageLength={activeTable.initialPageLength}
            pageLengthChoices={activeTable.pageLengthChoices}
            initialSortFields={activeTable.initialSortFields}
            darkMode={props.darkMode}
            debounceTime={props.debounceTime}
            onExport={activeTable.onExport}
            index={activeTable.index}
          />
        )}
      </div>
    </div>
  );
});

export { Database };
export type { TableConfig, DatabaseProps };