import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { TbTableExport, TbZoomReset } from 'react-icons/tb';
import { debounce } from 'throttle-debounce';
import { FloatingTooltip } from './FloatingTooltip';
import { Pagination } from './Pagination';
import { ColumnDefinition, SortField, SearchState, DEBOUNCE_INPUT_TIME_MS } from './types';

interface TableControlProps {
  tableId: string;
  columns: ColumnDefinition[];
  exportTable: () => void;
  numRecords: number;
  numFilteredRecords: number;
  sortFields: SortField[];
  setSortFields: React.Dispatch<React.SetStateAction<SortField[]>>;
  search: SearchState;
  setSearch: React.Dispatch<React.SetStateAction<SearchState>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageLength: number;
  setPageLength: React.Dispatch<React.SetStateAction<number>>;
  pageLengthChoices: number[];
  pageCount: number;
  debounceTime?: number;
  resetColumns: () => void;
  initiaDefaultSearch: (columns: ColumnDefinition[]) => SearchState;
}

const TableControl: React.FC<TableControlProps> = ({
  tableId,
  columns,
  exportTable,
  numRecords,
  numFilteredRecords,
  sortFields,
  setSortFields,
  search,
  setSearch,
  page,
  setPage,
  pageLength,
  setPageLength,
  pageLengthChoices,
  pageCount,
  debounceTime,
  resetColumns,
  initiaDefaultSearch,
}) => {
  const [searchInput, setSearchInput] = React.useState(search.global);

  React.useEffect(() => {
    const debounceFunc = debounce(debounceTime ?? DEBOUNCE_INPUT_TIME_MS, () => {
      setSearch((_search) => ({
        ..._search,
        global: searchInput}));
    }, {atBegin: false});

    debounceFunc();
    return(() => {
      debounceFunc.cancel();
    });
  }, [searchInput]);

  function _setPageLength(newPageLength: number){
    let firstEntryPage;
    if (newPageLength === Infinity){
      firstEntryPage = 1;
    } else {
      let firstEntry = ((page - 1) * pageLength) + 1;
      firstEntryPage = Math.ceil(firstEntry / newPageLength);
    }
    setPage(firstEntryPage);
    setPageLength(newPageLength);
  }

  let pageLengthOptions = [];
  let addedOneAbove = false;
  for (let i = 0; i < pageLengthChoices.length; i++){
    let pageLen = pageLengthChoices[i];
    // Add all options up to the filtered count, plus one option above it
    if (pageLen <= numFilteredRecords || !addedOneAbove){
      pageLengthOptions.push({ value: pageLen.toString(), label: pageLen.toString() });
      if (pageLen > numFilteredRecords){
        addedOneAbove = true;
      }
    }
  }

  return(
    <div className="rare-earth-control" role="group" aria-label="Table controls">
      <div className="rare-earth-control-row">
        <FloatingTooltip content="Export Filtered Data as CSV">
          <button
            className="rare-earth-button"
            onClick={() => exportTable()}
            aria-label="Export filtered data as CSV"
            type="button"
          >
            <TbTableExport size="1.25rem"/>
            Export
          </button>
        </FloatingTooltip>
        
        <div className="rare-earth-record-count">
          <span className="rare-earth-text">{numFilteredRecords} filtered</span>
          <div className="rare-earth-divider"></div>
          <span className="rare-earth-text">{numRecords} total</span>
        </div>
        
        <div className="rare-earth-search-container">
          <FaSearch aria-hidden="true"/>
          <input
            className="rare-earth-input"
            placeholder="Table Search"
            aria-label="Search table"
            value={searchInput ?? ''}
            onChange={(event) => setSearchInput((event.target.value?.trim() == '') ? null : event.target.value)}
            type="search"
            name="table-search"
            autoComplete="off"
            data-testid={`global-search-input-${tableId}`}
          />
          <FloatingTooltip content="Reset Table">
            <button
              className="rare-earth-avatar danger"
              onClick={() => {
                setPage(1);
                setSearchInput(null);
                setSortFields([]);
                setSearch(initiaDefaultSearch(columns));
                resetColumns();
              }}
              aria-label="Reset table to initial state"
              type="button"
            >
              <TbZoomReset/>
            </button>
          </FloatingTooltip>
        </div>
      </div>
      
      <div className="rare-earth-control-row">
        <div className="rare-earth-label">
          <label id={`page-length-label-${tableId}`} htmlFor={`page-length-select-${tableId}`}>Page Length</label>
          <select
            id={`page-length-select-${tableId}`}
            className="rare-earth-select"
            value={pageLength.toString()}
            onChange={(e) => _setPageLength(parseFloat(e.target.value))}
            aria-labelledby={`page-length-label-${tableId}`}
            data-testid={`page-length-select-${tableId}`}
          >
            {pageLengthOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        
        <Pagination
          tableId={tableId}
          value={page}
          onChange={setPage}
          total={pageCount}
        />
      </div>
    </div>
  );
}

export { TableControl };