const Filter = ({ filterStr, setFilterStr }) => {
  const handleFilterChange = (e) => {
    setFilterStr(e.target.value);
  };

  return (
    <div>
      filter shown with <input onChange={handleFilterChange} value={filterStr} />
    </div>
  );
};

export default Filter;