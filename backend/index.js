const express = require('express'),
  path = require('path');

const app = express();

const dotenv = require('dotenv'),
  { Client } = require('pg');

app.get('/api', (_request, response) => {
  response.send({ emojis: '🫡😜😶‍🌫️🫨😌😪' });
});

app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000/');
});
