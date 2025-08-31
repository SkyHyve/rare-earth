import React from 'react';
import { debounce } from 'throttle-debounce';
import { TableControl } from './TableControl';
import { TableHeader } from './TableHeader';
import { FloatingTooltip } from './FloatingTooltip';
import { ColumnDefinition, SortField, SearchState } from './types';

interface DataTableProps {
  id?: string;
  columns: ColumnDefinition[];
  records: any[];
  initialPage?: number;
  initialPageLength?: number;
  pageLengthChoices?: number[];
  initialSortFields?: SortField[];
  debounceTime?: number;
  theme?: any;
  onExport?: (data: any[]) => void;
  darkMode?: boolean;
  style?: React.CSSProperties;
  index?: boolean;
}

const initiaDefaultSearch = function(columns: ColumnDefinition[]): SearchState {
  return {
    global: null,
    fields: Object.fromEntries((columns ?? []).map((x, i) => [
      x.key,
      {
        _type: ((x.type == 'number') ? 'number' : 'string'),
        string: {
          text: null,
          trim: true,
          caseSensitive: false,
          isRegex: false
        },
        number: {
          omitNonNumeric: false,
          value: null,
          gt: {
            value: null,
            equals: false,
          },
          lt: {
            value: null,
            equals: false,
          }
        }
      }
    ])),
  };
};

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>((props, ref) => {
  const tableId = props.id || `rare-earth-table-${React.useId()}`;
  const tableDescriptionId = `${tableId}-description`;
  const tableStatsId = `${tableId}-stats`;
  // Use a stable key that doesn't change unless necessary
  const indexKeyRef = React.useRef(`__index_${Date.now()}`);
  const [columns, setColumns] = React.useState({
    _indexKey: indexKeyRef.current,
    order: (props.columns ?? []).map((x, i) => x.key),
    attributes: Object.fromEntries((props.columns ?? []).map((x, i) => [x.key, {...x, typeToggleable: x.typeToggleable ?? true, valueFunc: x?.valueFunc ?? ((record) => {
      switch (x.type == 'number'){
        case true:
          return parseFloat(record?.[x.key]);
        case false:
          return record?.[x.key];
    }})}])),
  });
  const [records, setRecords] = React.useState(props.records ?? []);

  const [pageLength, setPageLength] = React.useState(props.initialPageLength ?? 20);
  const [pageLengthChoices, setPageLengthChoices] = React.useState(props.pageLengthChoices ?? [10, 20, 50, 100, Infinity]);
  const [page, setPage] = React.useState(props.initialPage ?? 1);

  const [sortFields, setSortFields] = React.useState(props.initialSortFields ?? []);
  const [search, setSearch] = React.useState(initiaDefaultSearch(props?.columns ?? []));
  
  const resetColumns = React.useCallback(() => {
    setColumns({
      _indexKey: indexKeyRef.current,
      order: (props.columns ?? []).map((x) => x.key),
      attributes: Object.fromEntries((props.columns ?? []).map((x) => [x.key, {...x, typeToggleable: x.typeToggleable ?? true, valueFunc: x?.valueFunc ?? ((record) => {
        switch (x.type == 'number'){
          case true:
            const numValue = parseFloat(record?.[x.key]);
            return isNaN(numValue) ? null : numValue;
          case false:
            return record?.[x.key];
      }})}])),
    });
  }, [props.columns]);

  const headerRefs = React.useRef({});

  const defaultCompareFunc = React.useCallback((a: any, b: any) => {
    if (a == null) {
      return b == null ? 0 : -1;
    }
    if (b == null) {
      return 1;
    }
    if (a == b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }, []);

  const compareRecords = React.useCallback((recordA: any, recordB: any) => {
    for (let i = 0; i < sortFields.length; i++){
      let sortField = sortFields[i]['key'];
      let reverse = sortFields[i]['reverse'];
      let compareFunc = columns.attributes[sortField].compareFunc;

      let aVal;
      let bVal;
      if (columns.attributes[sortField].valueFunc != null){
        aVal = columns.attributes[sortField].valueFunc(recordA);
        bVal = columns.attributes[sortField].valueFunc(recordB);
      } else {
        aVal = recordA[sortField];
        bVal = recordB[sortField];
      }
      
      if (columns.attributes[sortField].type == 'number'){
        if (aVal != null){
          aVal = parseFloat(aVal);
        }
        if (bVal != null){
          bVal = parseFloat(bVal);
        }
      }

      let compareVal;
      if (reverse){
        compareVal = compareFunc ? compareFunc(bVal, aVal) : defaultCompareFunc(bVal, aVal);
      } else {
        compareVal = compareFunc ? compareFunc(aVal, bVal) : defaultCompareFunc(aVal, bVal);
      }
      
      if (compareVal != 0){
        return compareVal;
      }
    }
    return 0;
  }, [sortFields, columns.attributes, defaultCompareFunc]);

  React.useEffect(() => {
    setColumns({
      _indexKey: indexKeyRef.current,
      order: (props.columns ?? []).map((x, i) => x.key),
      attributes: Object.fromEntries((props.columns ?? []).map((x, i) => [x.key, {...x, typeToggleable: x.typeToggleable ?? true, valueFunc: x?.valueFunc ?? ((record) => record?.[x.key])}])),
    });
  }, [props.columns]);
  
  React.useEffect(() => {
    setRecords(props.records ?? []);
  }, [props.records]);

  function stringDoesMatch({recordCompareStr, keySearch, trim, caseSensitive, isRegex}: any){
    if (keySearch == null){
      return true;
    }

    let _recordCompareStr = trim ? recordCompareStr.trim() : recordCompareStr;
    let _keySearch = trim ? keySearch.trim() : keySearch;
    
    if (!caseSensitive && !isRegex){
      _recordCompareStr = _recordCompareStr.toLowerCase();
      _keySearch = _keySearch.toLowerCase();
    }
    
    if (isRegex){
      let _regex = new RegExp(_keySearch, caseSensitive ? "g" : "gi");
      return _regex.test(_recordCompareStr);
    } else {
      return _recordCompareStr.includes(_keySearch);
    }
  }

  function numberDoesMatch({ recordNumber, omitNonNumeric, gtNum, gtEquals, ltNum, ltEquals }: any){
    if (isNaN(recordNumber)){
      return !omitNonNumeric;
    }

    if (gtNum != null){
      if (gtEquals){
        if (recordNumber < gtNum) return false;
      } else {
        if (recordNumber <= gtNum) return false;
      }
    }
    
    if (ltNum != null){
      if (ltEquals){
        if (recordNumber > ltNum) return false;
      } else {
        if (recordNumber >= ltNum) return false;
      }
    }
    
    return true;
  }

  function doesMatch({ recordCompareStr, keySearch }: any){
    if (keySearch._type === 'string'){
      return stringDoesMatch({
        recordCompareStr: recordCompareStr,
        keySearch: keySearch.string.text,
        trim: keySearch.string.trim,
        caseSensitive: keySearch.string.caseSensitive,
        isRegex: keySearch.string.isRegex,
      });
    } else if (keySearch._type === 'number'){
      return numberDoesMatch({
        recordNumber: new Number((recordCompareStr ?? '')?.trim?.()),
        omitNonNumeric: keySearch.number.omitNonNumeric,
        gtNum: keySearch.number.gt?.value,
        gtEquals: keySearch.number.gt?.equals,
        ltNum: keySearch.number.lt?.value,
        ltEquals: keySearch.number.lt?.equals,
      });
    }
  }

  const filteredRecords = React.useMemo(function(){
    const newRecords = [];
    for (let i = 0; i < records.length; i++){
      let record = records[i];
      let include = !Boolean(search.global);
      for (let key in search.fields){
        let recordCompareStr = (columns?.attributes?.[key]?.valueFunc?.(record) ?? '')?.toString?.();

        if ((Boolean(search.global)) && (stringDoesMatch({
          recordCompareStr: recordCompareStr,
          keySearch: search.global,
          trim: true,
          caseSensitive: false,
          isRegex: false
        }))){
          include = true;
          break;
        }

        let keySearch = search.fields[key];
        if (keySearch._type == 'string'){
          if (keySearch.string.text == null){
            continue;
          }
        } else if (keySearch._type == 'number'){
          if ((keySearch.number.gt?.value == null) && (keySearch.number.lt?.value == null)){
            if ((keySearch.number.omitNonNumeric) && isNaN(new Number((recordCompareStr ?? '')?.trim?.()))){
              include = false;
            }
            continue;
          }
        }
        if (doesMatch({
          recordCompareStr: recordCompareStr,
          keySearch: keySearch,
        })){
          if (Boolean(search.global)){
            include = true;
            break;
          }
        } else {
          if (!Boolean(search.global)){
            include = false;
            break;
          }
        }
      }
      if (include){
        newRecords.push({...record, [columns._indexKey]: i});
      }
    }

    return newRecords;
  }, [search, records, columns._indexKey]);

  const filteredSortedRecords = React.useMemo(function(){
    const sortedRecords = [...filteredRecords].sort(compareRecords);
    return sortedRecords;
  }, [sortFields, filteredRecords, compareRecords]);

  // Create two-row header structure
  let main_headers = [];
  let sub_headers = [];
  
  if (props.index !== false){
    main_headers.push(<th key="index-main" className="index-main-header" colSpan={2}>Row No.</th>);
    sub_headers.push(
      <th key="index-source" className="index-sub-header">
        <FloatingTooltip content="Original row number from the source dataset">
          <span>Src</span>
        </FloatingTooltip>
      </th>
    );
    sub_headers.push(
      <th key="index-current" className="index-sub-header">
        <FloatingTooltip content="Current position in the filtered and sorted dataset">
          <span>Cur</span>
        </FloatingTooltip>
      </th>
    );
  }
  
  for (let i = 0; i < columns.order.length; i++){
    let key = columns.order[i];
    let column = columns.attributes[key];
    main_headers.push(
      <TableHeader 
        ref={headerRefs}
        key={key}
        tableId={tableId}
        columns={columns}
        setColumns={setColumns}
        sortFields={sortFields}
        setSortFields={setSortFields}
        search={search}
        setSearch={setSearch}
        column_index={i}
        column_key={key}
        column={column}
        debounceTime={props.debounceTime}
        rowSpan={2}
      />
    )
  }

  let pageCount = Math.max(Math.ceil((filteredSortedRecords?.length ?? 0) / pageLength), 1);
  let rows = [];

  let lb = (pageLength === Infinity) ? 0 : (page - 1) * pageLength;
  let ub = (pageLength === Infinity) ? filteredSortedRecords.length : Math.min(page * pageLength, filteredSortedRecords.length);

  for (let i = lb; i < ub; i++){
    let record = filteredSortedRecords[i];
    let cells = [];
    let colIndex = 1;
    if (props.index !== false){
      cells.push(<td key="index-source" className="index-column" aria-colindex={colIndex++}>{record[columns._indexKey] + 1}</td>);
      cells.push(<td key="index-current" className="index-column" aria-colindex={colIndex++}>{i + 1}</td>);
    }
    for (let j = 0; j < columns.order.length; j++){
      let key = columns.order[j];
      let column = columns.attributes[key];

      let value;
      if (column.valueFunc != null){
        value = column.valueFunc(record);
      } else {
        value = record[key];
      }

      if (column.displayFunc != null){
        let cellDisplay = column.displayFunc(record, value);
        cells.push(<td key={key} aria-colindex={colIndex++}>{cellDisplay}</td>);
      } else {
        cells.push(<td key={key} aria-colindex={colIndex++}>{value}</td>);
      }
    }
    rows.push(
      <tr 
        key={i} 
        role="row"
        aria-rowindex={i + 1}
        data-testid={`table-row-${tableId}-${i}`}
        data-row-index={i}
      >
        {cells}
      </tr>
    );
  }
  
  if ((page > 1) && ((filteredSortedRecords.length < ((page - 1) * pageLength + 1)) || (pageLength === Infinity))){
    setPage(1);
  }

  const exportTable = React.useCallback(() => {
    let csvContent = "data:text/csv;charset=utf-8,";
    let exportRows = [];

    let exportHeaders = [];
    for (let i = 0; i < columns.order.length; i++){
      let key = columns.order[i];
      let column = columns.attributes[key];
      exportHeaders.push(column.label ?? column.key);
    }
    exportRows.push(exportHeaders.join(","));

    for (let i = 0; i < filteredSortedRecords.length; i++){
      let exportRecord = [];
      let record = filteredSortedRecords[i];
      for (let j = 0; j < columns.order.length; j++){
        let key = columns.order[j];
        let column = columns.attributes[key];
        let value;
        if (column.valueFunc != null){
          value = column.valueFunc(record);
        } else {
          value = record[key];
        }
        exportRecord.push((value == null) ? '' : String(value));
      }
      exportRows.push(exportRecord.join(","));
    }

    csvContent += exportRows.join("\r\n");
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }, [columns, filteredSortedRecords]);

  return(
    <div 
      ref={ref} 
      id={props.id} 
      className={`rare-earth-container${props.darkMode ? ' dark-mode' : ''}`} 
      style={props.style}
      role="region"
      aria-label="Data table with sorting and filtering"
      aria-describedby={`${tableDescriptionId} ${tableStatsId}`}
      data-testid={`data-table-${tableId}`}
      data-component="rare-earth-table"
    >
      <div id={tableDescriptionId} className="sr-only" translate="yes">
        Interactive data table with sorting, filtering, and pagination capabilities. Use column headers to sort data and filter controls to narrow results.
      </div>
      <div id={tableStatsId} className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {lb + 1} to {ub} of {filteredSortedRecords.length} filtered results (from {records.length} total records)
      </div>
      <TableControl
        tableId={tableId}
        columns={props?.columns ?? []}
        exportTable={exportTable}
        numRecords={records.length}
        numFilteredRecords={filteredRecords.length}
        sortFields={sortFields}
        setSortFields={setSortFields}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
        pageLength={pageLength}
        setPageLength={setPageLength}
        pageLengthChoices={pageLengthChoices}
        pageCount={pageCount}
        debounceTime={props.debounceTime}
        resetColumns={resetColumns}
        initiaDefaultSearch={initiaDefaultSearch}
      />
      <table 
        className={`rare-earth-table${props.darkMode ? ' dark-mode' : ''}`}
        role="table"
        aria-label="Data table"
        aria-rowcount={filteredSortedRecords.length}
        aria-colcount={columns.order.length + (props.index !== false ? 2 : 0)}
        aria-describedby={tableDescriptionId}
      >
        <thead role="rowgroup">
          <tr>
            {main_headers}
          </tr>
          {props.index !== false && (
            <tr>
              {sub_headers}
            </tr>
          )}
        </thead>
        <tbody role="rowgroup">
          {rows}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className="rare-earth-no-results" role="status" aria-live="polite" aria-atomic="true" translate="yes">
          No Results Found After Filtering
        </div>
      )}
    </div>
  );
});

export { DataTable, initiaDefaultSearch };