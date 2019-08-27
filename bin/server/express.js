const express = require('express');
const path = require('path');
const app = express();


console.log('connected to server');


app.use(express.static(path.join(__dirname,'../../bin'))); // serving the bin directory as main source of static files. 

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '../../client/index.html'));
});



module.exports = app;