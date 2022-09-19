const express = require("express");
const mysql = require("mysql2/promise");
const { dbconfig } = require("../config");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // blokas kuriame bandoma vykdyti koda
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT * FROM product");
    await con.end();
    res.send(response);
  } catch (error) {
    // blokas kuris ivyksta kai try sufeilino
    console.error(error);
  }
});

//3.1

router.get("/discountPercentage/highest", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);

    const [response] = await con.execute(
      "SELECT * FROM product ORDER BY discountPercentage DESC"
    );

    res.send(response);

    await con.end();
  } catch (e) {
    console.error(e);
  }
});

//3.2

router.get("/discountPercentage/lowest", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);

    const [response] = await con.execute(
      "SELECT * FROM product ORDER BY discountPercentage ASC"
    );

    res.send(response);

    await con.end();
  } catch (e) {
    console.error(e);
  }
});
router.get("/total_price/sum", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);

    const [response] = await con.execute(
      "SELECT SUM(price) AS Total_price FROM product"
    );

    res.send(response);

    await con.end();
  } catch (e) {
    console.error(e);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const con = await mysql.createConnection(dbconfig);

//     const data = req.body;

//     const response = await con.execute(
//       `INSERT INTO product (title, description, price, discountPercentage, brand, category) values(${con.escape(
//         data.title
//       )}, ${con.escape(data.description)}, ${con.escape(
//         data.price
//       )}, ${con.escape(data.discountPercentage)},
//         ${con.escape(data.brand)}, ${con.escape(data.category)})`
//     );

//     res.send(response[0]);

//     await con.end();
//   } catch (e) {
//     console.error(e);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (
      data.title &&
      data.description &&
      data.price &&
      data.discountPercentage &&
      data.brand &&
      data.category
    ) {
      const con = await mysql.createConnection(dbconfig);

      const response = await con.execute(
        `INSERT INTO product (title, description, price, discountPercentage, brand, category) values (${con.escape(
          data.title
        )}, ${con.escape(data.description)}, ${con.escape(
          data.price
        )}, ${con.escape(data.discountPercentage)}, ${con.escape(
          data.brand
        )}, ${con.escape(data.category)})`
      );
      console.log(response);
      res.send(response);
      await con.end();
    } else {
      res.status(400).send("Bad syntax");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
