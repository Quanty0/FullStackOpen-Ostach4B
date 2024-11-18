/* eslint-disable react/prop-types */

const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      filter shown with <input onChange={handleFilterChange} value={filter} />
    </div>
  );
};

export default Filter;