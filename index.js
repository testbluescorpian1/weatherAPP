const http = require("http");
const https = require("https");
const express = require("express");
const fs = require("fs");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
const ansindex = fs.readFileSync("ans.html", "utf-8");

server.post("/", (req, res) => {
  const city = req.body.cityName;
  https
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0d13bf7b9017af89cb0ccc791d8cbf1&units=metric`,
      (kaka) => {
        let data = "";
        kaka.on("data", (chunk) => {
          data += chunk;
        });
        kaka.on("end", () => {
          // res.send(JSON.parse(data));

          data = JSON.parse(data);
          if (data.cod == "404") {
            res.send(404);
            return;
          }
          let mindex = ansindex.replace('**city**',data.name).
          replace('**temp**',data.main.temp). 
          replace('**feel**',data.main.feels_like). 
          replace('**wspeed**',data.wind.speed). 
          replace('**all**',data.clouds.all);
          res.send(mindex)
          return;
        });
      }
    )
    .on("error", (error) => {
      console.log("error");
    });
});

server.get("/:id", (req, res) => {
  const city = req.params.id;
  https
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0d13bf7b9017af89cb0ccc791d8cbf1&units=metric`,
      (kaka) => {
        let data = "";
        kaka.on("data", (chunk) => {
          data += chunk;
        });
        kaka.on("end", () => {
          // res.send(JSON.parse(data));

          data = JSON.parse(data);
          if (data.cod == "404") {
            res.send(404);
            return;
          }
          const mtemp = data.main.temp;
          const ans = `Todays temp is ${mtemp}\n`;
          res.send(ans);
          return;
        });
      }
    )
    .on("error", (error) => {
      console.log("error");
    });
});

server.post("/", (req, res) => {
  let city = req.body.id;
  https
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0d13bf7b9017af89cb0ccc791d8cbf1&units=metric`,
      (kaka) => {
        let data = "";
        kaka.on("data", (chunk) => {
          data += chunk;
        });
        kaka.on("end", () => {
          const data = JSON.parse(data);
          res.send(data.main);
        });
      }
    )
    .on("error", (error) => {
      console.log("error");
    });
});

server.get("/", (req, res) => {
  res.send("please search some city ");
});

server.listen(8080, () => {
  console.log("server started");
});
