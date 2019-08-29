const express = require('express');
const path = require('path');
const app = express();
// const cors = require('cors');


console.log('connected to server');

app.use(express.static(path.join(__dirname,'../../bin'))); // serving the bin directory as main source of static files. 

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '../../client/dist/index.html'));
});



module.exports = app;