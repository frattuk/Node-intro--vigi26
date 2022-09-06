// eslint-disable-next-line newline-per-chained-call
const express = require("express");
const Joi = require("joi");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { dbconfig, jwtSecret } = require("../config");

const router = express.Router();
const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});
//Reg
router.post("/register", async (req, res) => {
  let userData = req.body;
  //schemos validacija
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    return res.status(400).send({ error: "Incorect data " });
  }

  try {
    const hashedpass = bcrypt.hashSync(userData.password);
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      `INSERT INTO users (email, password) values (${mysql.escape(
        userData.email
      )}, '${hashedpass}')`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: "Server error" });
  }
});
//log
router.post("/login", async (req, res) => {
  let userData = req.body;
  //schemos validacija
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    return res.status(400).send({ error: "Incorect data " });
  }
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(`
    SELECT * FROM users
    WHERE email = ${mysql.escape(userData.email)}`);
    await con.end();

    if (response.length === 0) {
      return res.status(400).send({ error: "incorrect email or password" });
    }
    const isAuthed = bcrypt.compareSync(
      userData.password,
      response[0].password
    );

    if (isAuthed) {
      console.log(response);
      console.log(jwtSecret);
      const token = jwt.sign(
        { id: response[0].id, email: response[0].email },
        jwtSecret
      );

      return res.send({ token });
    } else {
      return res.status(400).send({ error: "incorrect password" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
