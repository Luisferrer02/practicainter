import React from 'react';

function DetalleComic({ comic, onClose }) {
  return (
    <div className="detalle-comic">
      <button onClick={onClose}>Cerrar</button>
      <h2>{comic.title}</h2>
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
      <p>{comic.description || 'Descripción no disponible.'}</p>
    </div>
  );
}

export default DetalleComic;
