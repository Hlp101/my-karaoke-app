import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleInputChange = (e) => {
    setSong(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const [artist, title] = song.split(' - ');
      const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      setLyrics(response.data.lyrics);
    } catch (error) {
      console.error('Error fetching lyrics:', error);
    }
  };

  return (
    <div>
      <h1>Bienvenido a la App de Karaoke</h1>
      <input
        type="text"
        placeholder="Ingrese una canción (artista - título)"
        value={song}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Buscar</button>
      {lyrics && (
        <div>
          <h2>Letra de la canción:</h2>
          <pre>{lyrics}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
