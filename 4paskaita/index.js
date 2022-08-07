// prisideti importus reikalingus express serveriui
// susikurti express serveri
// susikurti API su "/users" path kuris grazins users masyva
// susikurti API su "/links" path kuris grazins links masyva
// paleisti serveri (LISTEN)

// sukurti POST API vartotojams, kuris pridės naują vartotoją į masyvą
// sukurti POST API vartotojams, kuris pridės naują linką į masyvą

const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());

const names = [];

app.get("/names", (req, res) => {
  res.status = 200;
  res.send(names);
});

app.post("/names", (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  names.push(req.body.name);
  res.send(req.body);
});

const links = ["https://www.google.lt/"];

app.get("/links", (req, res) => {
  res.send(links);
});

app.post("/links", (req, res) => {
  console.log(req.body);
  links.push(req.body.link);
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
