import React, { useState } from "react";
import DetalleComic from "./detalle";
import ListaFavs from "./listafavs";
import "../App.css";

function ListaMain({ comics, filterText }) {
  const [favs, setFavs] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [showFavs, setShowFavs] = useState(false);

  const toggleFav = (comic) => {
    //le falta que sea toggle el boton de mostrar
    if (favs.includes(comic)) {
      setFavs(favs.filter((fav) => fav.id !== comic.id));
    } else {
      setFavs([...favs, comic]);
    }
  };

  const filteredComics = comics.filter((comic) =>
    comic.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <button id="toggle-favs" onClick={() => setShowFavs(!showFavs)}>
        {showFavs ? "Ocultar Favoritos" : "Mostrar Favoritos"}
      </button>
      {showFavs && <ListaFavs favs={favs} toggleFav={toggleFav} setSelectedComic={setSelectedComic} />}
      <div className="comics-grid">
        {filteredComics.map((comic) => (
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
              <span className="star">
                {favs.some((fav) => fav.id === comic.id) ? "★" : "☆"}
              </span>
            </div>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <h3>{comic.title}</h3>
          </div>
        ))}
      </div>
      {selectedComic && (
        <DetalleComic
          comic={selectedComic}
          onClose={() => setSelectedComic(null)}
        />
      )}
    </div>
  );
}

export default ListaMain;
