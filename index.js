const express = require('express');
const compile = require('./api/compile'); // Import the compile.js script
const app = express();
const port = 3000;

// Call the compile function to start the LaTeX compilation when the app is launched
compile();

app.get('/', (req, res) => {
  res.send('Hello, LaTeX Compiler!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
