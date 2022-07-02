// Example Display

window.RareEarth = {

  TablePagination: function(props){

    const paginationButtonStyles = {
      border: '1px solid black',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      margin: '0.25rem 0.25rem'
    };

    let paginationButtons = [];
    switch (props.page == 1){
      case false:
        paginationButtons.push(<button style={paginationButtonStyles} onClick={() => props.setPage(1)}><b>{String.fromCharCode(60) + String.fromCharCode(60)}</b></button>);
        paginationButtons.push(<button style={paginationButtonStyles} onClick={() => props.setPage(props.page - 1)}><b>{String.fromCharCode(60)}</b></button>);
        break;
      case true:
        paginationButtons.push(<button style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => props.setPage(1)}><b>{String.fromCharCode(60) + String.fromCharCode(60)}</b></button>);
        paginationButtons.push(<button style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => props.setPage(props.page - 1)}><b>{String.fromCharCode(60)}</b></button>);
        break;
    }
    for (let i = props.page - 3; i < props.page; i ++){
      switch (i < 1){
        case true:
          paginationButtons.push(<button style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => props.setPage(i)}><b>{i}</b></button>);
          break;
        case false:
          paginationButtons.push(<button style={paginationButtonStyles} onClick={() => props.setPage(i)}><b>{i}</b></button>);
          break;
      }
    }
    paginationButtons.push(<button><b>{props.page}</b></button>);
    for (let i = props.page + 1; i < props.page + 4; i ++){
      switch (i > props.pageCount){
        case true:
          paginationButtons.push(<button style={Object.assign({}, paginationButtonStyles, {visibility: 'hidden'})} onClick={() => props.setPage(i)}><b>{i}</b></button>);
          break;
        case false:
          paginationButtons.push(<button style={paginationButtonStyles} onClick={() => props.setPage(i)}><b>{i}</b></button>);
      }
    }
    switch (props.page == props.pageCount){
      case false:
          paginationButtons.push(<button style={paginationButtonStyles} onClick={() => props.setPage(props.page + 1)}><b>{String.fromCharCode(62)}</b></button>);
          paginationButtons.push(<button style={paginationButtonStyles} onClick={() => props.setPage(props.pageCount)}><b>{String.fromCharCode(62) + String.fromCharCode(62)}</b></button>);
      case true:
        break;
    }

    return(
      <div style={{display: 'flex'}}>
        {paginationButtons}
      </div>
    )
  },
  TableHeader: function(props){

    function sortFieldClick(event){
      var this_field_reverse = null;
      for (let i = 0; i < props.sortFields.length; i++){
        let sortField = props.sortFields[i];
        if (sortField['key'] == props.column_key){
          this_field_reverse = sortField['reverse'];
        }
      }

      var new_sort_fields = [];
      switch(event.shiftKey){
        case false:
          switch (props.sortFields.length < 2){
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
          for (let i = 0; i < props.sortFields.length; i++){
            let sortField = props.sortFields[i];
            if (sortField['key'] == props.column_key){
              current_key_included = true;
              console.log(this_field_reverse);
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
    for (let i = 0; i < props.sortFields.length; i++){
      let sortField = props.sortFields[i];
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

    console.log(sortArrowStyles);

    return(
      <th>
        <div style={{alignItems: 'center', display: 'flex'}}>
          <div style={{padding: '0px 8px 0px 8px', flex: '0 0', position: 'relative'}}>
            <button style={sortButtonStyle} onClick={sortFieldClick}>
              <div style={{minWidth: '24px', height: '100%', minHeight: '48px'}}>
                <div style={sortArrowStyles.up}>{"\u25B2"}</div>
                <div style={sortArrowStyles.down}>{"\u25BC"}</div>
              </div>
              <div style={{minWidth: '24px', height: '100%', minHeight: '48px'}}>
                <div>{column_sort_meta.index}</div>
                <div>{column_sort_meta.symbol}</div>
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

    const [pageLength, setPageLength] = React.useState(props.defaultPageLength || 10);
    const [page, setPage] = React.useState(props.defaultPage || 1);
    const [sortFields, setSortFields] = React.useState(props.defaultSortFields || []);
    const [searchText, setSearchText] = React.useState(props.defaultSerachText || '');
    const [useSearchRegex, setUseSearchRegex] = React.useState(props.defaultSearchRegex || false);

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
      for (let i = 0; i < sortFields.length; i++){

        let sortField = sortFields[i]['key'];
        let reverse = sortFields[i]['reverse'];
        let compareFunc = columns.attributes[sortField].compareFunc;

        let aVal = columns[sortField].valueFunc(recordA);
        let bVal = columns[sortField].valueFunc(recordB);

        var compareVal;
        switch(reverse){
          case false:
            switch (sortFunc == null){
              case false:
                compareVal = defaultCompareFunc(aVal, bVal);
                break;
              case true:
                compareVal = compareFunc(aVal, bVal);
                break;
            }
            break;
          case true:
            switch (sortFunc == null){
              case false:
                compareVal = defaultCompareFunc(bVal, aVal);
                break;
              case true:
                compareVal = compareFunc(bVal, aVal);
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
    let sortedRecords = React.useMemo(() => records.sort(compareRecords), [
      sortFields,
      searchText,
      useSearchRegex,
      columns,
      records
    ]);

    let columns_headers = [];
    for (let key in columns){
      let column = columns[key];
      columns_headers.push(<RareEarth.TableHeader key={key} column_key={key} column={column} sortFields={sortFields} setSortFields={setSortFields}/>)
    }

    let pageCount = Math.ceil(sortedRecords.length / pageLength);
    let rows = [];
    for (let i = (page - 1) * pageLength; i < Math.min(page * pageLength, sortedRecords.length); i++){
      let record = sortedRecords[i];
      let cells = [];
      for (let i = 0; i < columns.order.length; i++){
        let column_key = columns.order[i];
        let column = columns.attributes[key];
        switch (column.displayFunc == null){
          case true:
            let value = column.valueFunc(record);
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

    return(
      <div>
        <RareEarth.TablePagination page={page} setPage={setPage} pageCount={pageCount}/>
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
          'valueFunc': function(record){
            return record['example_column_key_1'];
          }
        },
        'example_column_key_2': {
          'name': 'Example Column Name 2',
          'type': 'number',
          'valueFunc': function(record){
            return record['example_column_key_2'];
          }
        },
        'example_column_key_3': {
          'name': 'Functional Example Concat',
          'type': 'string',
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
