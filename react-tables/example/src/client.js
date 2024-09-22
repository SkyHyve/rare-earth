import { h, render } from 'preact';
import { DataTable } from '@rare-earth/react-tables/dist/bundle.esm';

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
  function getRandomNumber(min, max) {
    if (Math.random() < 0.15){
      return null;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to generate a random string of given length
  function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // Generate an array of 200 objects
  const RECORDS = Array.from({ length: 200 }, () => ({
    a: getRandomNumber(1, 100), // Random number between 1 and 100
    b: getRandomString(10)      // Random string of 10 characters
  }));

  return(
    <div className="App" style="">
      <DataTable
        columns={COLUMNS}
        records={RECORDS}
      />
    </div>
  );
}
render(<App />, document.getElementById("root"));
