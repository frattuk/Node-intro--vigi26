const express = require("express");
const mysql = require("mysql2/promise");

const { dbconfig } = require("../config");

const router = express.Router();

const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      "SELECT COUNT(id)AS user_count FROM users"
    );
    await con.end();
    return res.send(response);
  } catch (e) {
    return res.status(400).send({ error: "Error" });
  }
});

module.exports = router;
