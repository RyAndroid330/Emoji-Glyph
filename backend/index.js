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

app.use(express.json());

app.get('/api', async (_request, response) => {
  const { rows } = await client.query('SELECT * FROM glyphs');
  response.send(rows);
});

// New endpoint to insert glyphs
app.post('/api/glyphs', async (request, response) => {
  const { glyph } = request.body;
  try {
    await client.query('INSERT INTO glyphs (emojis) VALUES ($1)', [glyph]);
    response.status(201).send({ message: 'Glyph inserted successfully' });
  } catch (error) {
    console.error('Error inserting glyph:', error);
    response.status(500).send({ error: 'Failed to insert glyph' });
  }
});

// New endpoint to delete glyphs
app.delete('/api/glyphs/:id', async (request, response) => {
  const { id } = request.params;
  try {
    await client.query('DELETE FROM glyphs WHERE id = $1', [id]);
    response.status(204).send();
  } catch (error) {
    console.error('Error deleting glyph:', error);
    response.status(500).send({ error: 'Failed to delete glyph' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(express.static(path.join(path.resolve(), 'dist')));
