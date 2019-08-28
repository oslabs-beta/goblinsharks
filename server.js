const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

app.get('/goblinql', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

app.listen(9000, () => {
  console.log('Welcome to GoblinQL Monitoring');
});