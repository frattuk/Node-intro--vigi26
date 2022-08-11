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

app.get("/categories", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("market")
      .collection("categories")
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/product", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("market")
      .collection("product")
      .find() // randa pagal tipa
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/categoryvalue", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("market")
      .collection("product")
      .aggregate([
        // { $match: {} },
        { $group: { _id: "$title" }, total: { $sum: "$price" } },
        {
          $lookup: {
            from: "categories", // kolekcija iš kurios nori imti
            localField: "title", //  .collection("orders") property
            foreignField: "title", // from: "customers" property
            as: "categoryvalue", // kaip norim pavadinti savo sujungima
          },
        },
      ])

      // .find()
      // .sort()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// const data = await con
//       .db("9paskaita")
//       .collection("orders")
//       .aggregate([
//         {
//           $lookup: {
//             from: "customers", // kolekcija iš kurios nori imti
//             localField: "customer", //  .collection("orders") property
//             foreignField: "name", // from: "customers" property
//             as: "customer_details", // kaip norim pavadinti savo sujungima
//           },
//         },
//       ])
//       .toArray();

app.listen(port, () => console.log(`Server is running on port ${port}`));
