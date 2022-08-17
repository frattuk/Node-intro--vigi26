const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;
const uri = process.env.CONNECTION;
const client = new MongoClient(uri);

app.get("/users", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("10paskaita")
      .collection("users")
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/userscomments", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("10paskaita")
      .collection("users")
      .aggregate([
        // { $match: {} },
        { $group: { _id: "name" } },
        {
          $lookup: {
            from: "comments", // kolekcija iš kurios nori imti
            localField: "comment", //  .collection("orders") property
            foreignField: "name", // from: "customers" property
            as: "userscomments", // kaip norim pavadinti savo sujungima
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

app.delete("/users/:id", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db("10paskaita")
      .collection("users")
      .deleteOne({ _id: ObjectId(req.params.id) });

    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// 62fbc56b29c1665121b37572

// 62fbc59929c1665121b37573

// app.delete("/users/:email", async (req, res) => {
//   try {
//     const con = await client.connect();

//     const data = await con
//       .db("10paskaita")
//       .collection("users")
//       .deleteOne({ email: req.params.email });

//     await con.close();
//     return res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));
