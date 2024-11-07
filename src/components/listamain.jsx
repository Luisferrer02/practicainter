import React, { useState } from 'react';
import DetalleComic from './detalle';
import ListaFavs from './listafavs';

function ListaMain({ comics, filterText }) {
  const [favs, setFavs] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [showFavs, setShowFavs] = useState(false);

  const toggleFav = (comic) => {
    if (favs.includes(comic)) {
      setFavs(favs.filter(fav => fav.id !== comic.id));
    } else {
      setFavs([...favs, comic]);
    }
  };

  const filteredComics = comics.filter(comic =>
    comic.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <button onClick={() => setShowFavs(!showFavs)}>Mostrar Favoritos</button>
      {showFavs && <ListaFavs favs={favs} toggleFav={toggleFav} />}
      <div className="comics-grid">
        {filteredComics.map(comic => (
          <div key={comic.id} className="comic-card">
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            <h3>{comic.title}</h3>
            <button onClick={() => toggleFav(comic)}>
              {favs.some(fav => fav.id === comic.id) ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
            </button>
            <button onClick={() => setSelectedComic(comic)}>Ver Detalle</button>
          </div>
        ))}
      </div>
      {selectedComic && <DetalleComic comic={selectedComic} onClose={() => setSelectedComic(null)} />}
    </div>
  );
}

export default ListaMain;
