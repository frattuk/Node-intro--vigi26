const express = require("express");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");

const { dbconfig, jwtSecret } = require("../config");
const { isLoggedIn } = require("../middleware");

const router = express.Router();

router.get("/user-tutorials/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      `SELECT * FROM tutorials WHERE user_id=${id}`
    );
    await con.end();
    res.send(response);
  } catch (e) {
    res.status(400).send({ error: "Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    console.log(token);
    const user = jwt.verify(token, jwtSecret);
    console.log(user);
    if (user) {
      const con = await mysql.createConnection(dbconfig);
      const [response] = await con.execute(`SELECT * FROM tutorials`);
      await con.end();
      res.send(response);
    } else {
      console.log("Not connected");
    }
  } catch (e) {
    res.status(400).send({ error: "Error" });
  }
});

module.exports = router;
