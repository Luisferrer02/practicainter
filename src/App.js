import React, { useState, useEffect } from 'react';
import ListaMain from './components/listamain';
//import ListaFavs from './components/listafavs';
import Filter from './components/filtro';
import md5 from 'crypto-js/md5';

const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const ts = Date.now().toString();
const hash = md5(ts + privateKey + publicKey).toString();

function App() {
  const [comics, setComics] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchComics = async () => {
      //const url = `https://gateway.marvel.com/v1/public/comics?orderBy=-modified&apikey=${publicKey}`;
      const url = `https://gateway.marvel.com/v1/public/comics?orderBy=-modified&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
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
  }, [hash, publicKey, ts]);

  return (
    <div className="App">
      <Filter setFilterText={setFilterText} />
      <ListaMain comics={comics} filterText={filterText} />
    </div>
  );
}
export { ts, hash, publicKey }; 

export default App;
