import React, { useState, useEffect } from 'react';
import ListaMain from './components/listamain';
//import ListaFavs from './components/listafavs';
import Filter from './components/filtro';
import md5 from 'crypto-js/md5';
import logo from './resources/marvel.png';

const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const ts = Date.now().toString();
const hash = md5(ts + privateKey + publicKey).toString();


function App() {
  const [comics, setComics] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [limit, setLimit] = useState(20);
  const [personajeBuscado, setPersonajeBuscado] = useState(''); // Nuevo estado

  const fetchCharacterId = async (nombrePersonaje) => {
    const urlPersonaje = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${nombrePersonaje}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try {
      const response = await fetch(urlPersonaje);
      const data = await response.json();
      if (data.data.results.length > 0) {
        return data.data.results[0].id; // Devuelve el primer ID encontrado
      } else {
        console.error('Personaje no encontrado');
        return null;
      }
    } catch (error) {
      console.error('Error fetching character ID:', error);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchComics = async () => {
      let characterId = null;
      if (personajeBuscado) {
        characterId = await fetchCharacterId(personajeBuscado);
      }
  
      const url = `https://gateway.marvel.com/v1/public/comics?limit=${limit}${characterId ? `&characters=${characterId}` : ''}&orderBy=-modified&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setComics(data.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchComics();
  }, [limit, personajeBuscado]);

  return (
    <div className="App">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <Filter
        setFilterText={setFilterText}
        setLimit={setLimit} // Se pasa la función como prop
        setPersonajeBuscado={setPersonajeBuscado}
      />
      <ListaMain comics={comics} filterText={filterText} />
    </div>
  );
}
export { ts, hash, publicKey }; 

export default App;
