import React from 'react';

function Filter({ setFilterText }) {
  return (
    <input
      type="text"
      placeholder="Buscar cómics..."
      onChange={(e) => setFilterText(e.target.value)}
    />
  );
}

export default Filter;
