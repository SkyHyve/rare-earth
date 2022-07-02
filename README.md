# Rare Earth
Rare Earth is a package for making React tables with ease.
This library is browser native so does not require any build step.

## Table of Contents

- Installation
- Usage

## Installation
```sh
npm install rare-earth
```

## Usage
Include the source in your html
```html
<script defer type="text/babel" src="{% static 'skyhyve/common/@tables.js' %}"></script>
```
 In your React functions
 ```js
 App();
 function App(){
   const container = document.getElementById('react-container');
   const root = ReactDOM.createRoot(container);

   // Might include classes for styles, like Bootstrap
   const tableClasses = ['table', 'table-dark', 'table-striped'];

   // Example Display
   const display = {
     'title': 'This is an Example Table',
     'pagination_options': [
       10,
       15,
       25,
       50,
     ]
   };

   // Example Columns
   const columns = {
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
         },
         'compareFunc': null,
         'displayFunc': null,
       },
       'example_column_key_2': {
         'name': 'Example Column Name 2',
         'type': 'number',
         'valueFunc': function(record){
           return record['example_column_key_2'];
         },
         'compareFunc': null,
         'displayFunc': null,
       },
       'example_column_key_3': {
         'name': 'Functional Example Concat',
         'type': 'string',
         'valueFunc': function(record){
           return ((record['example_column_key_1'] == null) || (record['example_column_key_2'] == null)) ? null : record['example_column_key_1'] + record['example_column_key_2'];
         },
         'compareFunc': null,
         'displayFunc': null,
       }
     }
   };

   // Example Records
   records: [
     {
       'example_column_key_1': 'abc',
       'example_column_key_2': 456
     },
     {
       'example_column_key_1': 'abc',
       'example_column_key_2': 123
     }
   ];

   root.render(
     <RareEarth.Table tableClasses={tableClasses} display={display} columns={columns} records={records}/>
   );
 }
 export default App;
 ```
