




// connection.addEventListener('open',()=>{
  //   console.log('websocket connection established to port 9000');
  // })
  
  // connection.addEventListener('message',(e) => {
    //   console.log('message received through socket connection')
    //   console.log(e)
    // })
    
const connection = new WebSocket('ws://localhost:9000');
connection.onopen = () => {
  console.log("socket is open on port 9000")
  connection.onmessage = (message) => {
    console.log(message);
    console.log('socket server message: ' + (message.data));

    fetch('./db/data.json')
    .then((data)=>data.json())
    .then((res)=>{
      console.log(res);
    })
  }
}


window.onload = () => {
  console.log(data)
  fetch('../db/data.json')
  .then((data)=>data.json())
  .then((res)=>{
    const vals = Object.values(res);
    vals.forEach((value)=>{
      document.querySelector('#data').append(`${JSON.stringify(value)}`);
    })
  })
}


