import React from 'react';
import './App.css';
import ChartWrapper from './chart-wrapper';
import TableWrapper from './table-wrapper';

function App() {

  let data = [
    { a: 1, b: 3, c: 10 },
    { a: 3, b: 20, c: 12 },
    { a: -1, b: -5, c: -4 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <p>Table and Chart</p>
      </header>
      <div>
        <ChartWrapper chartData={data} />
        <TableWrapper chartData={data}/>
      </div>
    </div>
  );
}

export default App;
