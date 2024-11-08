import React, { useState, useEffect } from "react";
import "../App.css";
import { ts, publicKey, hash } from "../App.js"; // Ajusta la ruta según sea necesario

function DetalleComic({ comic, onClose }) {
  const [charactersWithImages, setCharactersWithImages] = useState([]);

  useEffect(() => {
    const fetchCharacterDetails = async (resourceURI) => {
      // Agregar los parámetros de autenticación a la URL
      const url = `${resourceURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.data.results[0]; // Extraer el primer personaje de los datos
    };

    const fetchAllCharacterDetails = async () => {
      const charactersDetails = await Promise.all(
        comic.characters.items.map(async (character) => {
          const characterData = await fetchCharacterDetails(
            character.resourceURI
          );
          return {
            name: character.name,
            image: characterData.thumbnail
              ? `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`
              : null,
          };
        })
      );
      setCharactersWithImages(charactersDetails);
    };

    if (comic.characters.items.length > 0) {
      fetchAllCharacterDetails();
    }
  }, [comic]);

  return (
    <div className="detalle-comic-overlay">
      <div className="detalle-comic-card">
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="detalle-comic-image"
        />
        <h2>{comic.title}</h2>
        <p>
          <strong>Número de edición:</strong> {comic.issueNumber}
        </p>
        <p>
          <strong>Descripción:</strong>{" "}
          {comic.description ? comic.description : "No disponible"}
        </p>
        <div>
          <strong>Personajes:</strong>
          {comic.characters.items.length > 0 ? (
            <ul>
              {charactersWithImages.map((character, index) => (
                <li key={index}>
                  {character.image ? (
                    <img
                      src={character.image}
                      alt={character.name}
                      className="imagen-personaje"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                  {character.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay personajes listados para este cómic.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleComic;
