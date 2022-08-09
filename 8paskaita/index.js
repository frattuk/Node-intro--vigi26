const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;
const uri = process.env.CONNECTION;
const client = new MongoClient(uri);

app.get("/pets", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con.db("8paskaita").collection("pets").find().toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("8paskaita")
      .collection("pets")
      .insertOne(req.body);
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/pets/:type", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("8paskaita")
      .collection("pets")
      .find({ type: req.params.type }) // randa pagal tipa
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/petsOldest", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("8paskaita")
      .collection("pets")
      .find()
      .sort({ age: -1 })
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
