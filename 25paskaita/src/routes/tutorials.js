const express = require("express");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");

const { dbconfig, jwtSecret } = require("../config");
const { isLoggedIn, isAuth } = require("../middleware");

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
    const isAuthenticated = await isAuth(req);
    const token = req.headers.authorization?.split(" ")[1] || "";
    const user = jwt.verify(token, jwtSecret);
    if (user) {
      const con = await mysql.createConnection(dbconfig);
      const [response] = await con.execute(
        `SELECT * FROM tutorials ${isAuthenticated ? "" : "WHERE private = 0"}`
      );
      await con.end();
      res.send(response);
    } else {
      console.log("Not connected");
    }
  } catch (e) {
    res.status(400).send({ error: "Error" });
  }
});

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const id = req.body.user.id;
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      `INSERT INTO tutorials (user_id, title, content) VALUES (${userId}, ${req.body.title}, ${req.body.content})`
    );
    await con.end();
    res.send(response);
  } catch (e) {
    res.status(400).send({ error: "Error" });
  }
});

module.exports = router;
