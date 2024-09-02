function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortOption, setSortOption] = useState('alphabetical');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  const filteredStocks = stocks.filter(stock => {
    if (filterType === 'All') return true;
    return stock.type === filterType;
  });

  const sortedStocks = filteredStocks.sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.ticker.localeCompare(b.ticker);
    } else if (sortOption === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <div>
      <select onChange={handleSortChange}>
        <option value="alphabetical">Alphabetical</option>
        <option value="price">Price</option>
      </select>
      <select onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Technology">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Health">Health</option>
      </select>
      <StockContainer stocks={sortedStocks} onStockClick={handleBuyStock} />
      <PortfolioContainer portfolio={portfolio} onRemoveStock={handleRemoveStock} />
    </div>
  );
}
