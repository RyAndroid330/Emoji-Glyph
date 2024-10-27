const express = require('express'),
  path = require('path');

const app = express();
const port = process.env.PORT || 4000; // Bind to the PORT environment variable

app.get('/api', (_request, response) => {
  response.send({ hello: 'World' });
});

app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`); // Log the port number
});
