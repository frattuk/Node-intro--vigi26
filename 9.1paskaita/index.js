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
const orders = [
  { product: "toothbrush", total: 4.75, customer: "Mike" },
  { product: "guitar", total: 199.99, customer: "Tom" },
  { product: "milk", total: 11.33, customer: "Mike" },
  { product: "pizza", total: 8.5, customer: "Karen" },
  { product: "toothbrush", total: 4.75, customer: "Karen" },
  { product: "pizza", total: 4.75, customer: "Dave" },
  { product: "toothbrush", total: 4.75, customer: "Mike" },
];

app.get("/spent", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("9paskaita")
      .collection("orders")
      .aggregate([
        { $match: {} },
        { $group: { _id: "$product", total: { $sum: "$total" } } },
        { $sort: { total: -1 } }, // nuo didziausio iki maziausio
      ])
      .toArray();

    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("9paskaita")
      .collection("orders")
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/count/:product", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("9paskaita")
      .collection("orders")
      .count({ product: req.params.product });
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/many", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("9paskaita")
      .collection("orders")
      .insertMany(orders);
    await con.close();
    return res.send({ count: data });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
