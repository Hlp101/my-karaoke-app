javascript
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, TextField, List, ListItem } from '@material-ui/core';
import axios from 'axios';

function App() {
  const [song, setSong] = useState('');
  const [songList, setSongList] = useState([]);
  const [lyrics, setLyrics] = useState('');

  const handleAddSong = async () => {
    setSongList([...songList, song]);
    setSong('');
    try {
      const response = await axios.get(`https://api.genius.com/search?q=${song}&access_token=ScG3yUCoR0ijHcJzOuDf8-pfbBdgV4uNDC5FmpfuJZroUQ01niXgBj4obWuW4bW9`);
      const songId = response.data.response.hits[0].result.id;
      const lyricsResponse = await axios.get(`https://api.genius.com/songs/${songId}?access_token=ScG3yUCoR0ijHcJzOuDf8-pfbBdgV4uNDC5FmpfuJZroUQ01niXgBj4obWuW4bW9`);
      setLyrics(lyricsResponse.data.response.song.lyrics);
    } catch (error) {
      console.error("Error fetching the lyrics: ", error);
      setLyrics("Letras no encontradas.");
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Karaoke App</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido a la App de Karaoke
        </Typography>
        <TextField
          label="Ingrese una canción"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddSong}>
          Añadir Canción
        </Button>
        <List>
          {songList.map((s, index) => (
            <ListItem key={index}>{s}</ListItem>
          ))}
        </List>
        <Typography variant="h6" component="p">
          {lyrics}
        </Typography>
      </Container>
    </div>
  );
}

export default App;