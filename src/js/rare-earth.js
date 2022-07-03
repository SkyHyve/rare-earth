class RareEarthValueValidationError extends Error {
  constructor(record, column, value, ...params){
    super(...params);

    this.record = record;
    this.column = column;
    this.value = value;
  }
}
window.RareEarth = {
  ValueValidationError: RareEarthValueValidationError,
  TablePagination: function(props){
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
    paginationButtons.push(<button key={props.userFields.page}><b>{props.userFields.page}</b></button>);
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
      <div style={{display: 'flex', backgroundColor: '#212529'}}>
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

    return(
      <th>
        <div style={{alignItems: 'center', display: 'flex'}}>
          <div style={{padding: '0px 8px 0px 8px', flex: '0 0', position: 'relative'}}>
            <button style={sortButtonStyle} onClick={sortFieldClick}>
              <div style={{minWidth: '18px', height: '100%', minHeight: '3rem'}}>
                <div style={sortArrowStyles.up}>{"\u25B2"}</div>
                <div style={sortArrowStyles.down}>{"\u25BC"}</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minWidth: '18px', height: '100%', minHeight: '3rem'}}>
                <div style={{}}>{column_sort_meta.index}</div>
              </div>
            </button>
          </div>
          <div style={{flex: '1'}}>
            {props.column.name}
          </div>
        </div>
      </th>
    )
  },
  Table: function(props){

    const [userFields, setUserFields] = React.useState({
      pageLength: 10,
      page: 1,
      sortFields: [],
      searchText: {},
      useSearchRegex: {},
      nullOrder: {},
    })

    const [display, setDisplay] = React.useState(props.display || {});
    const [columns, setColumns] = React.useState(props.columns || []);
    const [records, setRecords] = React.useState(props.records || []);

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

        let aVal = columns.attributes[sortField].valueFunc(recordA);
        let bVal = columns.attributes[sortField].valueFunc(recordB);

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
      columns,
      records
    ]);

    let columns_headers = [];
    for (let i = 0; i < columns.order.length; i++){
      let key = columns.order[i];
      let column = columns.attributes[key];
      columns_headers.push(<RareEarth.TableHeader key={key} column_key={key} column={column} userFields={userFields} setUserFields={setUserFields}/>)
    }

    let pageCount = Math.ceil(sortedRecords.length / userFields.pageLength);
    let rows = [];
    for (let i = (userFields.page - 1) * userFields.pageLength; i < Math.min(userFields.page * userFields.pageLength, sortedRecords.length); i++){
      let record = sortedRecords[i];
      let cells = [];
      for (let j = 0; j < columns.order.length; j++){
        let key = columns.order[j];
        let column = columns.attributes[key];
        switch (column.displayFunc == null){
          case true:
            let value = column.valueFunc(record);
            if ((value == null) && (!column.allow_null)){
              throw new RareEarth.ValueValidationError(record, column, value, `RareEarth.ValueValidationError: null values not allowed in the column '${key}'. Error occurs in record ${JSON.stringify(record)}`);
            }
            if ((typeof(value) != column.type) && value != null){
              throw new RareEarth.ValueValidationError(record, column, value, `RareEarth.ValueValidationError: Received type '${typeof(value)}' in the column '${key}, expected type '${column.type}'. Error occurs in record ${JSON.stringify(record)} with value ${value}`);
            }

            cells.push(<td key={key}>{value}</td>);
            break;
          case false:
            let cellDisplay = column.displayFunc(record);
            cells.push(<td key={key}><div dangerouslySetInnerHTML={{__html: cellDisplay}}></div></td>);
            break;
        }
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    console.debug('Render Table');
    return(
      <div>
        <RareEarth.TablePagination userFields={userFields} setUserFields={setUserFields} pageCount={pageCount}/>
        <table className={props.tableClasses.join(' ')}>
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
  },
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
          'name': 'Example Column Name 1',
          'type': 'string',
          'allow_null': true,
          'valueFunc': function(record){
            return record['example_column_key_1'];
          }
        },
        'example_column_key_2': {
          'name': 'Example Column Name 2',
          'type': 'number',
          'allow_null': true,
          'valueFunc': function(record){
            return record['example_column_key_2'];
          }
        },
        'example_column_key_3': {
          'name': 'Functional Example Concat',
          'type': 'string',
          'allow_null': true,
          'valueFunc': function(record){
            return ((record['example_column_key_1'] == null) || (record['example_column_key_2'] == null)) ? null : record['example_column_key_1'] + record['example_column_key_2'];
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
