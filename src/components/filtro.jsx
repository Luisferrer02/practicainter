import React, { useState } from 'react';

function Filter({ setFilterText, setLimit, setPersonajeBuscado }) {
  const [personajeInput, setPersonajeInput] = useState('');

  const handleLimitChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setLimit(20);
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setLimit(parsedValue);
      }
    }
  };

  const handlePersonajeInputChange = (e) => {
    setPersonajeInput(e.target.value);
  };

  const handleBuscarClick = () => {
    setPersonajeBuscado(personajeInput);
  };

  return (
    <div>
      <input
        type="text"
        id="comic-filter"
        placeholder="Buscar cómics por nombre..."
        onChange={(e) => setFilterText(e.target.value)}
      />
      <input
        type="number"
        id="comic-limit"
        placeholder="Límite de resultados"
        onChange={handleLimitChange}
        min="1"
      />
      <div>
        <input
          type="text"
          id="character-filter"
          placeholder="Buscar por personaje"
          value={personajeInput}
          onChange={handlePersonajeInputChange}
        />
        <button onClick={handleBuscarClick}>Buscar</button>
      </div>
    </div>
  );
}

export default Filter;
