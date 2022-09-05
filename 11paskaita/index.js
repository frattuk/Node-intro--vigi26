const express = require("express");
const mysql = require("mysql2/promise");
const PORT = 8080;

const app = express();

const mysqlConfig = {
  host: "mysql-vigi26-do-user-12289236-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "AVNS_Va208HFT4DPmvBK5D83",
  database: "defaultdb",
  port: "25060",
};

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    console.log("Success: " + con);

    con.execute(""); // siunciamas i duomenu baze
    res.send("Success");

    await con.end(); // atsijungiama nuo duomenu bazes
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
