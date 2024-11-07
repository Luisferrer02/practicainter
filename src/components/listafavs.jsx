import React from 'react';

function ListaFavs({ favs, toggleFav }) {
  return (
    <div className="favs-overlay">
      <h2>Favoritos</h2>
      <div className="comics-grid">
        {favs.map(comic => (
          <div key={comic.id} className="comic-card">
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            <h3>{comic.title}</h3>
            <button onClick={() => toggleFav(comic)}>Quitar de Favoritos</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaFavs;
