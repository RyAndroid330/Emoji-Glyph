const express = require('express'),
  path = require('path');

app.use(express.static(path.join(path.resolve(), 'dist')));

const app = express(),
  port = process.env.PORT || 3000;

app.get('/', (_request, response) => {
  response.send({ hello: 'World' });
});

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
const dotenv = require('dotenv'),
  { Client } = require('pg');

app.get('/api', (_request, response) => {
  response.send({ emojis: '🫡😜😶‍🌫️🫨😌😪' });
});
