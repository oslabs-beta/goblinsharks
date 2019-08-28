// const data = require('./src/db/data.json');


window.onload = () => {
  console.log(data)
  fetch('/src/db/data.json')
  .then((data)=>data.json())
  .then((res)=>{
    const vals = Object.values(res);
    vals.forEach((value)=>{
      document.querySelector('#data').append(`${JSON.stringify(value)}`);
    })
  })
}