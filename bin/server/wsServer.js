const httpServer = require('http').createServer();
const WebSocket = require('ws').Server
const app = require('./express.js')
const fs = require('fs');
const path = require('path');


// Note: both the express server and the Websocket server sit on top of the Httpserver (port 9000)

const wss = new WebSocket({
  server: httpServer
})

httpServer.on('request', app);

wss.on('connection', (ws) => { // initiating ws connection
  console.log('Websocket connection established');
  fs.watchFile(path.join(__dirname,'../db/data.json'),{interval:1000},(data) => { // listening for changes to data.json
    // broadcast(data);
    ws.send(JSON.stringify({hello:"World"})); // sending to client updated data
    console.log('file changed');
  })
});



httpServer.listen(9000,() => {
  console.log('listening on port 9000')
});