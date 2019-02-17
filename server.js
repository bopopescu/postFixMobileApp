// server.js
const axios = require("axios");

const express = require('express');

const app = express();
const PORT = process.env.PORT = 3000;

app.use(express.static('public'));

app.get("/index.html",(req,rese)=>{
    response.sendFile(__dirname + '/public/index.html')
})

app.get("/:address",(req,res)=>{
  let address = req.params.address;

  if(address){
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${address}&destinations=1125 Colonel By Dr, Ottawa, ON&key=AIzaSyA4vvxV-HP2A8upYTwu7788qGJSKXC-V0s`
    axios.get(url)
    .then(data=>{console.log(data)})
    .catch(err=>{console.log(err)});
  }
  
})

app.listen(PORT, () => {
  console.log('Server is running at:',PORT);
})