function Stock({ stock, onStockClick }) {
  return (
    <div onClick={() => onStockClick(stock)}>
      <h3>{stock.name}</h3>
      <p>{stock.ticker}: ${stock.price}</p>
    </div>
  );
}

function PortfolioContainer({ portfolio, onRemoveStock }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map((stock) => (
        <Stock key={stock.id} stock={stock} onStockClick={onRemoveStock} />
      ))}
    </div>
  );
}

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  const handleBuyStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const handleRemoveStock = (stockToRemove) => {
    setPortfolio(portfolio.filter(stock => stock.id !== stockToRemove.id));
  };

  return (
    <div>
      <StockContainer stocks={stocks} onStockClick={handleBuyStock} />
      <PortfolioContainer portfolio={portfolio} onRemoveStock={handleRemoveStock} />
    </div>
  );
}
