const connection = new WebSocket('ws://localhost:8080');





connection.addEventListener('open',()=>{
  console.log('websocket connection established to port 8080');
})

connection.addEventListener('message',(e) => {
  console.log(e)
})


window.onload = () => {
  console.log(data)
  fetch('./db/data.json')
  .then((data)=>data.json())
  .then((res)=>{
    const vals = Object.values(res);
    vals.forEach((value)=>{
      document.querySelector('#data').append(`${JSON.stringify(value)}`);
    })
  })
}


