import React from 'react';
const DisplayOptions = ({ displayOption, setDisplayOption }) => {
  const handleDisplayChange = (e) => {
    setDisplayOption(e.target.value);
  };

  return (
    <div className="displayOptions">
      <label htmlFor="display-select">Display:</label>
      <select id="display-select" value={displayOption} onChange={handleDisplayChange}>
        <option value="status">By Status</option>
        <option value="user">By User</option>
        <option value="priority">By Priority</option>
      </select>
    </div>
  );
};

export default DisplayOptions;
