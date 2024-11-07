import React, { useState, useEffect } from 'react';
import ListaMain from './components/listamain';
//import ListaFavs from './components/listafavs';
import Filter from './components/filtro';
import md5 from 'crypto-js/md5';

function App() {
  const [comics, setComics] = useState([]);
  const [filterText, setFilterText] = useState('');

  const publicKey = '3020f4197a307f61356112d94191bbd8';
  const privateKey = 'e8f91f88c8784d764a685e9370d1d7c55ce7fadb';
  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey).toString();

  const url = `https://gateway.marvel.com/v1/public/comics?orderBy=-modified&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching data:', error));

  return (
    <div className="App">
      <Filter setFilterText={setFilterText} />
      <ListaMain comics={comics} filterText={filterText} />
    </div>
  );
}

export default App;
