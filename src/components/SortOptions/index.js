import React from 'react';

const SortOptions = ({ sortOption, setSortOption }) => {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="sortOptions">
      <label htmlFor="sort-select">Sort:</label>
      <select id="sort-select" value={sortOption} onChange={handleSortChange}>
        <option value="priority">By Priority</option>
        <option value="title">By Title</option>
      </select>
    </div>
  );
};

export default SortOptions;
