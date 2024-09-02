import React, { useState, useEffect } from 'react';
import Stock from './Stock';

function StockContainer() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []); // Runs once when the component mounts

  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => (
        <Stock key={stock.id} stock={stock} />
      ))}
    </div>
  );
}

export default StockContainer;
