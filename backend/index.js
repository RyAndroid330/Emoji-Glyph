const dotenv = require('dotenv'),
  express = require('express'),
  { Client } = require('pg');
path = require('path');

const app = express();

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.get('/api', async (_request, response) => {
  const { rows } = await client.query('SELECT * FROM glyphs');
  response.send(rows);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(express.static(path.join(path.resolve(), 'dist')));
