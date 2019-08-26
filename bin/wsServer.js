const httpServer = require('http').createServer();
const WebSocket = require('ws').Server
const app = require('./express.js')
const fs = require('fs');
const path = require('path');


const wss = new WebSocket({
  server: httpServer
})

httpServer.on('request', app);

// broadcast to subscribers using websockets
function broadcast(data){
  wss.clients.forEach((ws)=>{
    ws.send(data);
  })
}

// looking at file changes to data.json every 5 secs
fs.watchFile(path.join(__dirname,'./db/data.json'),(data) => {
  broadcast(data);
  console.log('file changed');
})




httpServer.listen(9000,() => {
  console.log('listening on port 9000')
});