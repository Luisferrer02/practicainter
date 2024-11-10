import React from "react";

function ListaFavs({ favs, toggleFav, setSelectedComic}) {
  return (
    <div className="favs-overlay">
      <h2>Favoritos</h2>
      <div className="comics-grid">
        {favs.map((comic) => (
          <div
            key={comic.id}
            className="comic-card"
            onClick={() => setSelectedComic(comic)} // Hacer clic en la tarjeta para ver detalles
          >
            <div
              className="favorite-btn"
              onClick={(e) => {
                e.stopPropagation(); // Prevenir que el clic en el botón de favoritos cierre el detalle
                toggleFav(comic);
              }}
            >
              <span className="star">&#9733;</span> {/* Estrella */}
            </div>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <h3>{comic.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaFavs;
