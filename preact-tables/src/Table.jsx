import { h, Fragment } from  'preact';
import { useContext, useEffect, useMemo, useState, useRef } from 'preact/hooks';
import { forwardRef } from 'preact/compat';

import { css, CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Box, Button, Flex, Modal, Select, Stack, TextInput, Tooltip } from '@mantine/core';
import {  createEmotionCache, MantineProvider } from '@mantine/core';

import { BsSearch, BsTriangleFill } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { TbTableExport } from 'react-icons/tb';

import { debounce } from 'throttle-debounce';

const DEBOUNCE_INPUT_TIME_MS = 500;

const ascendingDeselectedCss = css`
  color: #adb5bd;
`;
const ascendingSelectedCss = css`
  color: #212529;
`;
const descendingDeselectedCss = css`
  color: #adb5bd;
  transform: rotate(180deg);
`;
const descendingSelectedCss = css`
  color: #212529;
  transform: rotate(180deg);
`;
const tableCss = css`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  color: #dee2e6;
  background-color: #212529;

  th, td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #495057;
  }

  thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #495057;
  }

  tbody + tbody {
    border-top: 2px solid #495057;
  }

  tbody tr:nth-of-type(even) {
    background-color: #2c3034;
  }
`;

const TableControl = ({
  exportTable,
  numRecords,
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
}) => {
  const [searchInput, setSearchInput] = useState(search.global);

  useEffect(() => {

    const debounceFunc = debounce(debounceTime ?? DEBOUNCE_INPUT_TIME_MS, () => {
      setSearch({...search, global: searchInput});
    }, {atBegin: false});

    debounceFunc();
    return(() => {
      debounceFunc.cancel();
    });
  }, [searchInput]);

  function _setPageLength(pageLength){
    let firstEntry = ((page - 1) * pageLength) + 1;
    let firstEntryPage = Math.ceil(firstEntry / pageLength);

    setPage(firstEntryPage);
    setPageLength(pageLength);
  }

  let pageLengthOptions = [];
  var addNextPageOption = true;
  for (let i = 0; i < pageLengthChoices.length; i++){
    let pageLength = pageLengthChoices[i];
    switch (pageLength < numRecords){
      case true:
        pageLengthOptions.push({ value: pageLength.toString(), label: pageLength.toString() });
        break;
      case false:
        pageLengthOptions.push({ value: numRecords.toString(), label: 'ALL' });
        addNextPageOption = false;
        break;
    }
    if (!addNextPageOption){
      break;
    }
  }

  let paginationButtons = [];
  switch (page <= 4){
    case false:
      paginationButtons.push(
        <Button
          key="<<"
          onClick={() => setPage(1)}
        >
          <b>{String.fromCharCode(60) + String.fromCharCode(60)}</b>
        </Button>
      );
      break;
    case true:
      paginationButtons.push(
        <Button
          classNames={{
            root: 'bf0f3433-a76c-4581-bd6e-ac13d49caf4f'
          }}
          key="<<"
          disabled={true}
          onClick={() => {}}
        >
          <b>{String.fromCharCode(60) + String.fromCharCode(60)}</b>
        </Button>
      );
      break;
  }
  for (let i = page - 3; i < page; i ++){
    switch (i < 1){
      case true:
        paginationButtons.push(
          <Button
            classNames={{
              root: 'ae6f8fac-8781-4f58-bb38-f61fc471b030'
            }}
            key={i}
            onClick={() => setPage(i)}
          >
            <b>{i}</b>
          </Button>
        );
        break;
      case false:
        paginationButtons.push(
          <Button
            key={i}
            onClick={() => setPage(i)}
          >
            <b>{i}</b>
          </Button>
        );
        break;
    }
  }
  paginationButtons.push(
    <Button
      key={page}
    >
      <b>{"Page " + page + " of " + pageCount}</b>
    </Button>
  );
  for (let i = page + 1; i < page + 4; i ++){
    switch (i > pageCount){
      case true:
        paginationButtons.push(
          <Button
            classNames={{
              root: 'aa2ce6aa-dd20-45c5-94e2-2a4bb225523d'
            }}
            key={i}
            onClick={() => setPage(i)}
          >
            <b>{i}</b>
          </Button>
        );
        break;
      case false:
        paginationButtons.push(
          <Button
            key={i}
            onClick={() => setPage(i)}
          >
            <b>{i}</b>
          </Button>
        );
    }
  }
  switch ((page + 4) > pageCount){
    case false:
      paginationButtons.push(
        <Button
          key=">>"
          onClick={() => setPage(pageCount)}
        >
          <b>{String.fromCharCode(62) + String.fromCharCode(62)}</b>
        </Button>
      );
      break;
    case true:
      paginationButtons.push(
        <Button
          classNames={{
            root: 'e6cbdcf0-c7bd-4fa8-9530-7234629f516c'
          }}
          key=">>"
          disabled={true}
          onClick={() => {}}
        >
          <b>{String.fromCharCode(62) + String.fromCharCode(62)}</b>
        </Button>
      );
      break;
  }

  return(
    <Flex
      align="top"
      gap="xs"
    >
      <Tooltip
        label="Export Data as CSV"
      >
        <Button
          leftIcon={<TbTableExport />}
          onClick={(event) => exportTable()}
        >
        </Button>
      </Tooltip>
      <Select
        label="Page Length"
        value={(pageLengthOptions.map((x, i) => parseInt(x.value)).includes(parseInt(pageLength)) ? pageLength.toString() : pageLengthOptions[0].value.toString())}
        onChange={(value) => _setPageLength(parseInt(value))}
        data={pageLengthOptions}
      />
      <Flex
        gap="xs"
      >
        {paginationButtons}
      </Flex>
      <Flex
        align="center"
        gap="xs"
        css={css`
          min-width: 150px;
        `}
      >
        <BsSearch/>
        <TextInput
          value={searchInput}
          onChange={(event) => setSearchInput((event.target.value == '') ? null : event.target.value)}
        />
      </Flex>
    </Flex>
  );
}

const TableHeader = forwardRef((props, ref) => {

  const [searchInput, setSearchInput] = useState(props.search[props.column_key]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {

    const debounceFunc = debounce(props.debounceTime ?? DEBOUNCE_INPUT_TIME_MS, () => {
      props.setSearch({...props.search, fields: {...props.search.fields, [props.column_key]: searchInput}});
    }, {atBegin: false});

    debounceFunc();
    return(() => {
      debounceFunc.cancel();
    });
  }, [searchInput]);

  function sortFieldClick(event){
    var this_field_reverse = null;
    for (let i = 0; i < props.sortFields?.length ?? 0; i++){
      let sortField = props.sortFields[i];
      if (sortField['key'] == props.column_key){
        this_field_reverse = sortField['reverse'];
      }
    }

    var new_sort_fields = [];
    switch(event.shiftKey){
      case false:
        switch (this_field_reverse){
          case false:
            new_sort_fields.push({'key': props.column_key, 'reverse': true});
            break;
          case true:
          case null:
            new_sort_fields.push({'key': props.column_key, 'reverse': false});
            break;
        };
        break;
      case true:
        var current_key_included = false;
        for (let i = 0; i < props.sortFields?.length ?? 0; i++){
          let sortField = props.sortFields[i];
          if (sortField['key'] == props.column_key){
            current_key_included = true;
            switch (this_field_reverse){
              case false:
                new_sort_fields.push({'key': props.column_key, 'reverse': true})
                break;
              case true:
              case null:
                new_sort_fields.push({'key': props.column_key, 'reverse': false})
                break;
            }
          } else{
            new_sort_fields.push(sortField);
          }
        }
        if (!current_key_included){
          new_sort_fields.push({'key': props.column_key, 'reverse': false})
        }
        break;
    }
    console.log(new_sort_fields);
    props.setSortFields(new_sort_fields);
  }

  var ascendingIcon = <BsTriangleFill css={ascendingDeselectedCss}/>;
  var descendingIcon = <BsTriangleFill css={descendingDeselectedCss}/>;
  var column_sort_meta = {
    'symbol': null,
    'index': null,
  };
  for (let i = 0; i < props.sortFields?.length ?? 0; i++){
    let sortField = props.sortFields[i];
    if (sortField.key == props.column_key){
      switch (sortField.reverse){
        case true:
          descendingIcon = <BsTriangleFill css={descendingSelectedCss}/>;
          break;
        case false:
          ascendingIcon = <BsTriangleFill css={ascendingSelectedCss}/>;
          break;
        case null:
          break;
      }
      column_sort_meta.index = i + 1;
    }
  }


  function swapColumns(columnA, columnB, indexA, before){

    if (columnA == columnB){
      return;
    }

    switch ((props.columns.attributes[columnA] == null) && (props.columns.attributes[columnA] == null)){
      case true:
        return;
      case false:
        let newColumnOrder = [];
        for (let i = 0; i < props.columns.order.length; i++){
          let orderColumnKey = props.columns.order[i];
          switch ((orderColumnKey == columnA) || (orderColumnKey == columnB)){
            case false:
              newColumnOrder.push(orderColumnKey);
              break;
            case true:
              switch (orderColumnKey == columnA){
                case true:
                  break;
                case false:
                  switch (Math.sign(Math.abs(i - indexA) - 1)){
                    case -1:
                      return;
                    case 0:
                      switch (indexA < i){
                        case true:
                          newColumnOrder.push(columnB);
                          newColumnOrder.push(columnA);
                          break;
                        case false:
                          newColumnOrder.push(columnA);
                          newColumnOrder.push(columnB);
                          break;
                      }
                      break;
                    case 1:
                      switch (before){
                        case true:
                          newColumnOrder.push(columnA);
                          newColumnOrder.push(columnB);
                          break;
                        case false:
                          newColumnOrder.push(columnB);
                          newColumnOrder.push(columnA);
                          break;
                      }
                    break;
                }
                  break;
              }
              break;
          }
        }
        props.setColumns({index: props.columns.index, order: newColumnOrder, attributes: props.columns.attributes});
    }
  }
  function onDragStartHandle(event, column_key, column_index){
    event.dataTransfer.setData('initiatorKey', column_key);
    event.dataTransfer.setData('initiatorIndex', column_index);
  }
  function onDropHandle(event){
    event.preventDefault();
    let columnA = event.dataTransfer.getData('initiatorKey');
    let indexA = event.dataTransfer.getData('initiatorIndex');

    var target = event.target;
    var columnB;
    while (!columnB){
      target = target.parentElement;
      if (!target){
        return;
      }
      columnB = target.getAttribute('data-rare-earth-column-key');
    }

    let boundingBox = target.getBoundingClientRect();
    let before = event.x <= ((boundingBox.left + boundingBox.right) / 2);

    switch (columnB == null){
      case true:
        return;
      case false:
        swapColumns(columnA, columnB, indexA, before);
    }
  }
  console.log(props);
  return(
    <th>
      <Stack
        spacing={0}
      >
        <div
          ref={(element) => ref.current[props.column_index] = element}
          data-rare-earth-column-key={props.column_key}
          draggable='true'
          onDragStart={(event) => onDragStartHandle(event, props.column_key, props.column_index)}
          onDragOver={(event) => event.preventDefault()}
          onDragEnter={(event) => event.preventDefault()}
          onDrop={(event) => onDropHandle(event)}
        >
          <Flex align="center">
            <Button
              className="p-1 m-1"
              styles={{root: {backgroundColor: "#495057", color: "#212529"}}}
              onClick={(event) => sortFieldClick(event)}
            >
              <Flex align="center" justify="center">
                {column_sort_meta.index}
                <Stack spacing={4} className="m-1">
                  {ascendingIcon}
                  {descendingIcon}
                </Stack>
              </Flex>
            </Button>
            {props.column.label ?? props.column_key.toString()}
          </Flex>
        </div>
        <Flex align="center">
          <TextInput
            value={searchInput ?? ''}
            onChange={(event) => setSearchInput((event.target.value == '') ? null : event.target.value)}
            css={css`width: 100%;`}
          />
        </Flex>
      </Stack>
    </th>
  );
});

const Table = forwardRef((props, ref) => {

  const [columns, setColumns] = useState({
    _indexKey: crypto.randomUUID(),
    order: (props.columns ?? []).map((x, i) => x.key),
    attributes: Object.fromEntries((props.columns ?? []).map((x, i) => [x.key, {...x, valueFunc: x?.valueFunc ?? ((record) => record?.[x.key])}])),
  });
  const [records, setRecords] = useState(props.records ?? []);

  const [pageLength, setPageLength] = useState(props.initialPageLength ?? 10);
  const [pageLengthChoices, setPageLengthChoices] = useState(props.pageLengthChoices ?? [10, 20, 50, 100, Infinity]);
  const [page, setPage] = useState(props.initialPage ?? 1);

  const [sortFields, setSortFields] = useState(props.initialSortFields ?? []);
  const [search, setSearch] = useState({
    global: null,
    fields: Object.fromEntries((props.columns ?? []).map((x, i) => [x.key, null])),
  });

  const headerRefs = useRef({});

  function defaultCompareFunc(a, b){
    switch(a == null){
      case true:
        switch(b == null){
          case true:
            return 0;
          case false:
            return 1;
        }
      case false:
        switch(b == null){
          case true:
            return -1;
          case false:
            switch(a == b){
              case true:
                return 0;
              case false:
                switch(a < b){
                  case true:
                    return -1;
                  case false:
                    return 1;
                }
            }
        }
    }
  }
  function compareRecords(recordA, recordB){
    for (let i = 0; i < sortFields.length; i++){

      let sortField = sortFields[i]['key'];
      let reverse = sortFields[i]['reverse'];
      let compareFunc = columns.attributes[sortField].compareFunc;

      var aVal;
      var bVal;
      switch (columns.attributes[sortField].valueFunc == null){
        case false:
          aVal = columns.attributes[sortField].valueFunc(recordA);
          bVal = columns.attributes[sortField].valueFunc(recordB);
          break;
        case true:
          aVal = recordA[sortField];
          bVal = recordB[sortField]
          break;
      }

      var compareVal;
      switch(reverse){
        case false:
          switch (compareFunc == null){
            case false:
              compareVal = compareFunc(aVal, bVal);
              break;
            case true:
              compareVal = defaultCompareFunc(aVal, bVal);
              break;
          }
          break;
        case true:
          switch (compareFunc == null){
            case false:
              compareVal = compareFunc(bVal, aVal);
              break;
            case true:
              compareVal = defaultCompareFunc(bVal, aVal);
              break;
          }
          break;
      };
      if (compareVal != 0){
        return compareVal;
      }
    }
    return 0;
  }

  useEffect(() => {
    setColumns({
      _indexKey: crypto.randomUUID(),
      order: (props.columns ?? []).map((x, i) => x.key),
      attributes: Object.fromEntries((props.columns ?? []).map((x, i) => [x.key, {...x, valueFunc: x?.valueFunc ?? ((record) => record?.[x.key])}])),
    });
  }, [props.columns]);
  useEffect(() => {
    setRecords(props.records ?? []);
  }, [props.records]);

  const filteredRecords = useMemo(function(){

    console.debug('Filtering Records');

    var newRecords = [];
    for (let i = 0; i < records.length; i++){
      let record = records[i];
      var include = !Boolean(search.global);
      for (let key in search.fields){
        let recordCompareStr = (columns?.attributes?.[key]?.valueFunc?.(record) ?? '')?.toString?.()?.trim?.()?.toLowerCase?.();

        let globalSearch = search.global?.trim?.()?.toLowerCase?.();
        if ((Boolean(search.global)) && (recordCompareStr?.includes?.(globalSearch))){
          include = true;
          break;
        }

        let keySearch = search.fields[key]?.trim?.()?.toLowerCase?.();
        if (!keySearch){
          continue;
        }
        if (recordCompareStr?.includes?.(keySearch)){
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

  }, [search, records]);

  const filteredSortedRecords = useMemo(function(){

    console.debug('Sorting Records');
    const sortedRecords = filteredRecords.sort(compareRecords);

    return sortedRecords;

  }, [sortFields, search, records]);

  let columns_headers = [];
  if ((props.index ?? false)){
    columns_headers.push(<th>Index</th>);
  }
  for (let i = 0; i < columns.order.length; i++){
    let key = columns.order[i];
    let column = columns.attributes[key];
    columns_headers.push(<TableHeader ref={headerRefs} key={key} columns={columns} setColumns={setColumns} sortFields={sortFields} setSortFields={setSortFields} search={search} setSearch={setSearch} column_index={i} column_key={key} column={column} />)
  }

  let pageCount = Math.ceil((filteredSortedRecords?.length ?? 0) / pageLength);
  let rows = [];
  for (let i = (page - 1) * pageLength; i < Math.min(page * pageLength, filteredSortedRecords.length); i++){
    let record = filteredSortedRecords[i];
    let cells = [];
    if ((props.index ?? false)){
      cells.push(<td>{record[columns._indexKey]}</td>);
    }
    for (let j = 0; j < columns.order.length; j++){
      let key = columns.order[j];
      let column = columns.attributes[key];

      var value;
      switch (column.valueFunc == null){
        case false:
          value = column.valueFunc(record);
          break;
        case true:
          value = record[key];
          break;
      }

      switch (column.displayFunc == null){
        case true:
          cells.push(<td key={key}>{value}</td>);
          break;
        case false:
          let cellDisplay = column.displayFunc(record, value);
          cells.push(<td key={key}>{cellDisplay}</td>);
          break;
      }
    }
    rows.push(<tr key={i}>{cells}</tr>);
  }

  function exportTable(){
    let csvContent = "data:text/csv;charset=utf-8,";

    let exportRows = [];

    let exportHeaders = [];
    for (let i = 0; i < columns.order.length; i++){
      let key = columns.order[i];
      let column = columns.attributes[key];
      exportHeaders.push(column.name);
    }
    exportRows.push(exportHeaders.join(","));

    for (var i = 0; i < filteredSortedRecords?.length ?? 0; i++){
      let exportRecord = [];
      let record = filteredSortedRecords[i];
      for (let j = 0; j < columns.order.length; j++){
        let key = columns.order[j];
        let column = columns.attributes[key];
        var value;
        switch (column.valueFunc == null){
          case false:
            value = column.valueFunc(record);
            break;
          case true:
            value = record[key];
            break;
        }
        exportRecord.push((value == null) ? '' : String(value));
      }
      exportRows.push(exportRecord.join(","));
    }

    csvContent += exportRows.join("\r\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  const cache = createCache({
    key: 'rare-earth',
    nonce: props.nonce,
  });
  cache.compat = true;

  console.debug('Render Table');
  return(
    <CacheProvider value={cache}>
      <MantineProvider
        theme={{colors: {'skyhyve': ['#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff']}, primaryColor: 'skyhyve'}}
        withGlobalStyles
        withNormalizeCSS
        emotionCache={cache}
      >
        <div ref={ref} id={props.id}>
          <TableControl
            exportTable={exportTable}
            numRecords={records.length}
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
          />
          <table css={tableCss}>
            <thead>
              <tr>
                {columns_headers}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </MantineProvider>
    </CacheProvider>
  );
});

export {
  Table,
};
