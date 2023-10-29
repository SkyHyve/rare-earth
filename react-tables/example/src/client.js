import { h, render } from 'preact';
import { Table } from '@rare-earth/react-tables';

const App = function(){

  const COLUMNS = [
    {
      key: 'a',
      label: 'A',
      type: 'number'
    },
    {
      key: 'b',
      type: 'string'
    }
  ];
  const RECORDS = [
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
    {a: 1, b: 'abc'},
    {a: 2, b: 'DEF'},
  ];

  return(
    <div className="App" style="">
      <Table
        columns={COLUMNS}
        records={RECORDS}
      />
    </div>
  );
}
render(<App />, document.getElementById("root"));
