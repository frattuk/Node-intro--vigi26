const express = require("express");
const app = express();
const cors = require("express");
const PORT = 8080;
app.use(cors());
app.use(express.json());

// "/" base path - pagrindinis kelias, pvz localhost:3000/
// req - request - kvietimas is vartotojo
// res - response - grazinimas is serverio

app.get("/", (req, res) => {
  const headers = { "Access-Control-Allow-Headers": "*" };
  req.headers = headers;
  res.send(["BMW", "VW", "Porshe"]);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
