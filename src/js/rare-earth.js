class RareEarthValueValidationError extends Error {
  constructor(record, column, value, ...params){
    super(...params);

    this.record = record;
    this.column = column;
    this.value = value;
  }
}
class RareEarthPropValidationError extends Error {
  constructor(propName, propValue, ...params){
    super(...params);

    this.propName = propName;
    this.propValue = propValue;
  }
}
window.RareEarth = {
  version: "0.0.8",
  ValueValidationError: RareEarthValueValidationError,
  PropValidationError: RareEarthPropValidationError,
  defaultProps: {
    pageLengthChoices: [
      10,
      15,
      25,
      50,
      100
    ],
    userFields: {
      pageLength: 10,
      page: 1,
    }
  },
  validateProps: function(props){
    // Validate columns prop
    if (props.columns == null){
      throw new RareEarth.PropValidationError('columns', props.columns, "The prop 'columns' is a required prop");
    }
    if (!Array.isArray(props.columns.order)){
      throw new RareEarth.PropValidationError('columns', props.columns, "The prop 'columns.order' must be an array");
    }

    // Validate pageLengthChoices prop
    if (props.pageLengthChoices != null){
      if (Array.isArray(props.pageLengthChoices) != true){
        throw new RareEarth.PropValidationError('pageLengthChoices', props.pageLengthChoices, "The prop 'pageLengthChoices' must be an Array of positive integers. Not Array");
      }
      if (!props.pageLengthChoices.every((x) => Number.isInteger(parseFloat(x)))){
        throw new RareEarth.PropValidationError('pageLengthChoices', props.pageLengthChoices, "The prop 'pageLengthChoices' must be an array of positive integers. Not Integers");
      }
      if (!props.pageLengthChoices.every((x) => parseFloat(x) > 0)){
        throw new RareEarth.PropValidationError('pageLengthChoices', props.pageLengthChoices, "The prop 'pageLengthChoices' must be an array of positive integers. Not Positive");
      }
    }

    // Validate userFields prop
    if (props.userFields != null){
      // Validate userFields.pageLength
      if (props.userFields.pageLength != null){
        if (!Number.isInteger(parseFloat(props.userFields.pageLength))){
          throw new RareEarth.PropValidationError('userFields.pageLength', props.userFields.pageLength, "The prop 'userFields.pageLength' must be a positive integer in the pageLengthChoices. Not Integer");
        }
        if (parseFloat(props.userFields.pageLength) <= 0){
          throw new RareEarth.PropValidationError('userFields.pageLength', props.userFields.pageLength, "The prop 'userFields.pageLength' must be a positive integer in the pageLengthChoices. Not Positive");
        }
        if (!(props.userFields?.pageLengthChoices ?? RareEarth.defaultProps.pageLengthChoices).map(parseFloat).includes(props.userFields.pageLength)){
          throw new RareEarth.PropValidationError('userFields.pageLength', props.userFields.pageLength, "The prop 'userFields.pageLength' must be a positive integer in the pageLengthChoices. Not in pageLengthChoices");
        }
      }

      // Validate userFields.page
      if (props.userFields.page != null){
        if (!Number.isInteger(parseFloat(props.userFields.page))){
          throw new RareEarth.PropValidationError('userFields.page', props.userFields.page, "The prop 'userFields.page' must be a positive integer. Not Integer");
        }
        if (parseFloat(props.userFields.page) <= 0){
          throw new RareEarth.PropValidationError('userFields.page', props.userFields.page, "The prop 'userFields.page' must be a positive integer in the pageLengthChoices. Not Positive");
        }
      }

      // Validate userFields.sortFields
      if (props.userFields.sortFields != null){
        if (!Array.isArray(props.userFields.sortFields)){
          throw new RareEarth.PropValidationError('userFields.sortFields', props.userFields.sortFields, "The prop 'userFields.sortField' must be an Array of objects of the form {'key': column_key, 'reverse': bool}. Not Array");
        }
        for (let i = 0; i < props.userFields.sortFields.length; i++){

        }
      }
    }
  },
  TablePagination: function(props){

    function setPageLength(pageLength){
      let firstEntry = ((props.userFields.page - 1) * props.userFields.pageLength) + 1;
      let firstEntryPage = Math.ceil(firstEntry / pageLength);

      props.setUserFields({
        pageLength: pageLength,
        page: firstEntryPage,
        sortFields: props.userFields.sortFields,
        searchText: props.userFields.searchText,
        useSearchRegex: props.userFields.searchText,
        nullOrder: props.userFields.nullOrder
      });
    }

    let pageLengthOptions = [];
    var addNextPageOption = true;
    for (let i = 0; i < props.pageLengthChoices.length; i++){
      let pageLength = props.pageLengthChoices[i];
      switch (pageLength < props.numRecords){
        case true:
          pageLengthOptions.push(<option key={pageLength} value={pageLength}>{pageLength}</option>);
          break;
        case false:
          pageLengthOptions.push(<option key={props.numRecords} value={props.numRecords}>{props.numRecords} (All)</option>);
          addNextPageOption = false;
          break;
      }
      if (!addNextPageOption){
        break;
      }
    }

    const paginationButtonStyles = {
      border: '1px solid black',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      margin: '0.25rem 0.25rem'
    };

    function setPage(page){
      props.setUserFields({
        pageLength: props.userFields.pageLength,
        page: page,
        sortFields: props.userFields.sortFields,
        searchText: props.userFields.searchText,
        useSearchRegex: props.userFields.searchText,
        nullOrder: props.userFields.nullOrder
      });
    }

    let paginationButtons = [];
    switch (props.userFields.page == 1){
      case false:
        paginationButtons.push(<button key="<<" style={paginationButtonStyles} onClick={() => setPage(1)}><b>{String.fromCharCode(60) + String.fromCharCode(60)}</b></button>);
        paginationButtons.push(<button key="<" style={paginationButtonStyles} onClick={() => setPage(props.userFields.page - 1)}><b>{String.fromCharCode(60)}</b></button>);
        break;
      case true:
        paginationButtons.push(<button key="<<" style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => setPage(1)}><b>{String.fromCharCode(60) + String.fromCharCode(60)}</b></button>);
        paginationButtons.push(<button key="<" style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => setPage(props.userFields.page - 1)}><b>{String.fromCharCode(60)}</b></button>);
        break;
    }
    for (let i = props.userFields.page - 3; i < props.userFields.page; i ++){
      switch (i < 1){
        case true:
          paginationButtons.push(<button key={i} style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => setPage(i)}><b>{i}</b></button>);
          break;
        case false:
          paginationButtons.push(<button key={i} style={paginationButtonStyles} onClick={() => setPage(i)}><b>{i}</b></button>);
          break;
      }
    }
    paginationButtons.push(<button key={props.userFields.page}><b>{"Page " + props.userFields.page + " of " + props.pageCount}</b></button>);
    for (let i = props.userFields.page + 1; i < props.userFields.page + 4; i ++){
      switch (i > props.pageCount){
        case true:
          paginationButtons.push(<button key={i} style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => setPage(i)}><b>{i}</b></button>);
          break;
        case false:
          paginationButtons.push(<button key={i} style={paginationButtonStyles} onClick={() => setPage(i)}><b>{i}</b></button>);
      }
    }
    switch (props.userFields.page == props.pageCount){
      case false:
        paginationButtons.push(<button key=">" style={paginationButtonStyles} onClick={() => setPage(props.userFields.page + 1)}><b>{String.fromCharCode(62)}</b></button>);
        paginationButtons.push(<button key=">>" style={paginationButtonStyles} onClick={() => setPage(props.pageCount)}><b>{String.fromCharCode(62) + String.fromCharCode(62)}</b></button>);
        break;
      case true:
        paginationButtons.push(<button key=">" style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => setPage(props.userFields.page + 1)}><b>{String.fromCharCode(62)}</b></button>);
        paginationButtons.push(<button key=">>" style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => setPage(props.pageCount)}><b>{String.fromCharCode(62) + String.fromCharCode(62)}</b></button>);
        break;
    }

    return(
      <div style={{display: 'flex', alignItems: "center", backgroundColor: '#212529'}}>
        <label htmlFor={props.tableId + "-pageLengthSelect"} style={{color: "#FFFFFF", padding: "0.25rem"}}>Page Length</label>
        <select id={props.tableId + "-pageLengthSelect"} autoComplete="off" style={{padding: "0.25rem"}} value={props.userFields.pageLength} onChange={(event) => setPageLength(event.target.value)}>
          {pageLengthOptions}
        </select>
        {paginationButtons}
      </div>
    )
  },
  TableHeader: function(props){

    function setSortFields(sortFields){
      props.setUserFields({
        pageLength: props.userFields.pageLength,
        page: props.userFields.page,
        sortFields: sortFields,
        searchText: props.userFields.searchText,
        useSearchRegex: props.userFields.searchText,
        nullOrder: props.userFields.nullOrder
      });
    }

    function sortFieldClick(event){
      var this_field_reverse = null;
      for (let i = 0; i < props.userFields.sortFields.length; i++){
        let sortField = props.userFields.sortFields[i];
        if (sortField['key'] == props.column_key){
          this_field_reverse = sortField['reverse'];
        }
      }

      var new_sort_fields = [];
      switch(event.shiftKey){
        case false:
          switch (props.userFields.sortFields.length < 2){
            case true:
              switch (this_field_reverse){
                case false:
                  new_sort_fields.push({'key': props.column_key, 'reverse': true});
                  break;
                case true:
                case null:
                  new_sort_fields.push({'key': props.column_key, 'reverse': false});
                  break;
              }
              break;
            case false:
              new_sort_fields.push({'key': props.column_key, 'reverse': false});
              break;
          }
          break;
        case true:
          var current_key_included = false;
          for (let i = 0; i < props.userFields.sortFields.length; i++){
            let sortField = props.userFields.sortFields[i];
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
      setSortFields(new_sort_fields);
    }

    const sortButtonStyle = {
      backgroundColor: '#FFFFFF',
      border: '1px solid black',
      borderRadius: '.25rem',
      cursor: 'pointer',
      display: 'flex',
      flex: '1',
      height: '100%',
      padding: '.125rem .0625rem',
      position: 'relative'
    }
    var sortArrowStyles = {
      up: {
        color: "#adb5bd",
      },
      down: {
        color: "#adb5bd",
      },
    };
    var column_sort_meta = {
      'symbol': null,
      'index': null,
    };
    for (let i = 0; i < props.userFields.sortFields.length; i++){
      let sortField = props.userFields.sortFields[i];
      if (sortField.key == props.column_key){
        switch (sortField.reverse){
          case true:
            sortArrowStyles.up.color = "#adb5bd";
            sortArrowStyles.down.color = "#212529";
            break;
          case false:
            sortArrowStyles.up.color = "#212529";
            sortArrowStyles.down.color = "#adb5bd";
            break;
          case null:
            sortArrowStyles.up.color = "#adb5bd";
            sortArrowStyles.down.color = "#adb5bd";
            break;
        }
        column_sort_meta.index = i + 1;
      }
    }


    function swapColumns(columnA, columnB){
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
                    newColumnOrder.push(columnB);
                    break;
                  case false:
                  newColumnOrder.push(columnA);
                  break;
                }
            }
          }
          props.setColumns({index: props.columns.index, order: newColumnOrder, attributes: props.columns.attributes});
      }
    }
    function onDragStartHandle(event){
      event.dataTransfer.setData('initiator', event.target.getAttribute('data-rare-earth-column-key'));
    }
    function onDropHandle(event){
      event.preventDefault();

      let columnA = event.dataTransfer.getData('initiator');
      let columnB = event.target.getAttribute('data-rare-earth-column-key');

      switch (columnB == null){
        case true:
          return;
        case false:
          swapColumns(columnA, columnB);
      }
    }

    return(
      <th data-rare-earth-column-key={props.column_key} draggable='true' onDragStart={onDragStartHandle} onDragOver={(event) => event.preventDefault()} onDragEnter={(event) => event.preventDefault()} onDrop={onDropHandle}>
        <div data-rare-earth-column-key={props.column_key} style={{alignItems: 'center', display: 'flex'}}>
          <div data-rare-earth-column-key={props.column_key} style={{padding: '0px 8px 0px 8px', flex: '0 0', position: 'relative'}}>
            <button data-rare-earth-column-key={props.column_key} style={sortButtonStyle} onClick={sortFieldClick}>
              <div data-rare-earth-column-key={props.column_key} style={{minWidth: '18px', height: '100%', minHeight: '3rem'}}>
                <div data-rare-earth-column-key={props.column_key} style={sortArrowStyles.up}>{"\u25B2"}</div>
                <div data-rare-earth-column-key={props.column_key} style={sortArrowStyles.down}>{"\u25BC"}</div>
              </div>
              <div data-rare-earth-column-key={props.column_key} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minWidth: '18px', height: '100%', minHeight: '3rem'}}>
                <div data-rare-earth-column-key={props.column_key} style={{}}>{column_sort_meta.index}</div>
              </div>
            </button>
          </div>
          <div data-rare-earth-column-key={props.column_key} style={{flex: '1'}}>
            {props.column.name}
          </div>
        </div>
      </th>
    )
  },
  ExportWidget: function(props){
    return(<button onClick={props.exportTable}>Export</button>)
  },
  Table: React.forwardRef(function(props, ref){
    RareEarth.validateProps(props);

    const rareEarthRef = ref ?? React.useRef(null);

    const [display, setDisplay] = React.useState(props.display ?? {});
    const [columns, setColumns] = React.useState(props.columns ?? {});
    const [records, setRecords] = React.useState(props.records ?? []);

    const [pageLengthChoices, setPageLengthChoices] = React.useState(props.pageLengthChoices ?? RareEarth.defaultProps.pageLengthChoices);
    const [userFields, setUserFields] = React.useState({
      pageLength: props?.userFields?.pageLength ?? RareEarth.defaultProps.userFields.pageLength,
      page: props?.userFields?.page ?? RareEarth.defaultProps.userFields.page,
      sortFields: props?.userFields?.sortFields ?? [],
      searchText: props?.userFields?.searchText ?? {},
      useSearchRegex: props?.userFields?.searchText ?? {},
      nullOrder: props?.userFields?.nullOrder ?? {},
    });

    React.useEffect(() => setColumns(props.columns), [props.records]);
    React.useEffect(() => setRecords(props.records), [props.records]);

    // Getters and Setters on Ref
    React.useEffect(function(){
      rareEarthRef.current.getUserFields = () => userFields;
    }, [userFields]);
    React.useEffect(function(){
      rareEarthRef.current.setUserFields = function(newUserFields){
        setUserFields({
          pageLength: newUserFields?.pageLength ?? userFields.pageLength,
          page: newUserFields?.page ?? userFields.page,
          sortFields: newUserFields?.sortFields ?? userFields.sortFields,
          searchText: newUserFields?.searchText ?? userFields.searchText,
          useSearchRegex: newUserFields?.useSearchRegex ?? userFields.useSearchRegex,
          nullOrder: newUserFields?.nullOrder ?? userFields.nullOrder,
        });
      }
    }, []);

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
      for (let i = 0; i < userFields.sortFields.length; i++){

        let sortField = userFields.sortFields[i]['key'];
        let reverse = userFields.sortFields[i]['reverse'];
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
          return compareVal ;
        }
      }
      return 0;
    }
    let sortedRecords = React.useMemo(function(){
        console.debug('Sorting Records');
        return records.sort(compareRecords);
      }, [
      userFields.sortFields,
      userFields.searchText,
      userFields.useSearchRegex,
      userFields.nullOrder,
      records
    ]);

    let columns_headers = [];
    for (let i = 0; i < columns.order.length; i++){
      let key = columns.order[i];
      let column = columns.attributes[key];
      columns_headers.push(<RareEarth.TableHeader key={key} columns={columns} setColumns={setColumns} column_key={key} column={column} userFields={userFields} setUserFields={setUserFields}/>)
    }

    let pageCount = Math.ceil(sortedRecords.length / userFields.pageLength);
    let rows = [];
    for (let i = (userFields.page - 1) * userFields.pageLength; i < Math.min(userFields.page * userFields.pageLength, sortedRecords.length); i++){
      let record = sortedRecords[i];
      let cells = [];
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

        if ((value == null) && (!column.allow_null)){
          throw new RareEarth.ValueValidationError(record, column, value, `RareEarth.ValueValidationError: null values not allowed in the column '${key}'. Error occurs in record ${JSON.stringify(record)}`);
        }
        if ((typeof(value) != column.type) && value != null){
          throw new RareEarth.ValueValidationError(record, column, value, `RareEarth.ValueValidationError: Received type '${typeof(value)}' in the column '${key}, expected type '${column.type}'. Error occurs in record ${JSON.stringify(record)} with value ${value}`);
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

      for (var i = 0; i < sortedRecords.length; i++){
        let exportRecord = [];
        let record = sortedRecords[i];
        for (let j = 0; j < columns.order.length; j++){
          let key = columns.order[j];
          let column = columns.attributes[key];
          let value = column.valueFunc(record);
          exportRecord.push((value == null) ? '' : String(value));
        }
        exportRows.push(exportRecord.join(","));
      }

      csvContent += exportRows.join("\r\n");
      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }

    console.debug('Render Table');
    return(
      <div ref={rareEarthRef} id={props.id}>
        <RareEarth.TablePagination tableId={1} numRecords={records.length} pageLengthChoices={pageLengthChoices.sort((a, b) => a > b)} userFields={userFields} setUserFields={setUserFields} pageCount={pageCount}/>
        <RareEarth.ExportWidget exportTable={exportTable}/>
        <table className={props.tableClasses?.join(' ') ?? ''}>
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
    )
  }),
  Examples: {
    display: {
      'title': 'This is an Example Table',
      'pagination_options': [
        10,
        15,
        25,
        50,
      ]
    },
    columns: {
      index: false,
      order: [
        'example_column_key_1',
        'example_column_key_2',
        'example_column_key_3'
      ],
      attributes: {
        'example_column_key_1': {
          name: 'Example Column Name 1',
          type: 'string',
          allow_null: true,
        },
        'example_column_key_2': {
          name: 'Example Column Name 2',
          type: 'number',
          allow_null: true,
        },
        'example_column_key_3': {
          name: 'Functional Example Concat',
          type: 'string',
          allow_null: true,
          valueFunc: function(record){
            return ((record['example_column_key_1'] == null) || (record['example_column_key_2'] == null)) ? null : record['example_column_key_1'] + record['example_column_key_2'];
          },
          displayFunc: function(record, value){
            return (<button onClick={(event) => console.log("The value is: " + value)}>{((record['example_column_key_1'] == null) || (record['example_column_key_2'] == null)) ? null : record['example_column_key_1'] + record['example_column_key_2']}</button>);
          }
        }
      }
    },
    records: [
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      },
      {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      },
      {
        'example_column_key_1': null,
        'example_column_key_2': 456
      },
    ]
  },
}
