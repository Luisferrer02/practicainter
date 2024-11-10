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
              : "", // URL de la imagen del personaje
          };
        })
      );
      setCharactersWithImages(charactersDetails);
    };

    fetchAllCharacterDetails();
  }, [comic]);

  return (
    <div className="detalle-overlay">
      <div className="detalle-card">
        <button className="close-button" onClick={onClose}>Cerrar</button>
        <div className="detalle-header">
          <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
          <h2>{comic.title}</h2>
          <p><strong>Issue Number:</strong> {comic.issueNumber}</p>
        </div>
        <div className="detalle-content">
          <p><strong>Description:</strong> {comic.description || "No description available"}</p>
          <h3>Characters:</h3>
          <ul>
            {charactersWithImages.map((character, index) => (
              <li key={index}>
                <img src={character.image} alt={character.name} />
                {character.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetalleComic;
