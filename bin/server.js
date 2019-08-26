const express = require('express');
const path = require('path');
const app = express();
const WebSocket = require("ws");
const fs = require('fs');


console.log('connected to server');

const wss = new WebSocket.Server({ port: 8080 });


// broadcast to subscribers using websockets
function broadcast(data){
  wss.clients.forEach((ws)=>{
    ws.send(data);
  })
}

// looking at file changes to data.json every 5 secs
fs.watchFile('./data.json',(data) => {
  broadcast(data);
  console.log('file changed');
})


app.use(express.static(__dirname));

app.get('/goblinql', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

app.listen(9000, () => {
  console.log('Welcome to GoblinQL Monitoring');
});