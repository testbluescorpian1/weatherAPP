const http = require("http");
const https = require("https");
const express = require("express");

const server = express();

const test = "sumit is good boy";

server.get("/:id", (req, res) => {
  const city = req.params.id;
  https.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0d13bf7b9017af89cb0ccc791d8cbf1&units=metric`,
    (kaka) => {
      let data = "";
      kaka.on("data", (chunck) => {
        data += chunck;
      });

      kaka.on('end',()=>{
        // console.log(data);
        res.json(JSON.parse(data));
        return;
      })
    }
  )
  .on('error',(error)=>{
    console.log('error');
  });

});

server.get("/", (req, res) => {
  console.log(`hello ${test}`);
  res.send(200);
});

server.listen(8080, () => {
  console.log("server started");
});
