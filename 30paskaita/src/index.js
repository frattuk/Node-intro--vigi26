// 1. susikurti pakcage.json ir supildyti
// 1.2 susikurti atitinkama failu struktura: src folderi, jame rautes folderis, src/config.js; src/index.js
// 3. susiinstaliuoti packagus (node modulius, pvz cors, express ir tt)

// 4. install nodemon kaip dev moduli npm install nodemon --save-dev
// 5. importuoti reikiamus modulius require("module")
// 6. susikofiguruoti index.js faila ir paleisti serveri
// 7. susikonfiguruoti /src/config.js ir .env (susitikrinti duomenu bazes pavadinima .env faile)
// 8. Susikurti atitinkamus routes pagal poreikius, pvz routes/users.js
// 9. importuoti express ir susikurti kintamaji const router = express.Router()
// 9.1 Pasirasyti routus ir isexportuoti router: module.exports = router
// 10 Pasirasyti route kuris grazins jog serveris veikia app.get('/',...) index.js faile
// 11 pasirasyti route app.all("*", (req, res) ir tt)

// !!!! nepamirsti susikurti duomenu baze MySQL  arba MONGODB su lentelemis

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express(); // express inicializavimas
app.use(express.json()); // kai daromas post, pareitu JSON formatu
app.use(cors()); // apsauga

const { port } = require("./config"); // ./ tam paciam folderyje, ../ atgal vienu folderiu

const product = require("./routes/product");
app.use("/product/", product);

// app.get("/", async (req, res) => {
//   try {
//     const con = await mysql.createConnection(dbconfig);
//     res.send("Success");
//     await con.end();
//   } catch (e) {
//     console.log(e);
//   }
// });

// app.get("/product", async (req, res) => {
//   try {
//     const con = await mysql.createConnection(dbconfig); // prisijungiam

//     const [response] = await con.execute("SELECT * FROM product;"); // padarom query - kvieciam is duomenu bazes

//     res.send(response); // grazinam atsakyma
//     await con.end(); // uzdarom prisijungina
//   } catch (e) {
//     console.log(e); // jeigu erroras
//   }
// });

// app.get("/product/:id?", async (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     if (Number.isInteger(id) || !req.params.id) {
//       const con = await mysql.createConnection(dbconfig);
//       const selectAll = "SELECT * FROM product";
//       const selectOne = `${selectAll} WHERE id=${id}`;
//       const response = await con.execute(id ? selectOne : selectAll);
//       res.send(response[0]);
//       await con.end();
//     } else {
//       res.status(400).send([]);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// });

// app.post("/product", async (req, res) => {
//   try {
//     const product = req.body;
//     if (
//       product.title &&
//       product.description &&
//       product.price &&
//       product.discountPercentage &&
//       product.brand
//     ) {
//       const con = await mysql.createConnection(dbconfig);

//       const response = await con.execute(
//         `INSERT INTO product (title, description, price, discountPercentage, brand) values (${con.escape(
//           product.title
//         )}, ${con.escape(product.description)}, ${con.escape(
//           product.price
//         )}, ${con.escape(product.discountPercentage)}, ${con.escape(
//           product.brand
//         )})`
//       );
//       console.log(response);
//       res.send(response);
//       await con.end();
//     } else {
//       res.status(400).send("Bad syntax");
//     }
//   } catch (e) {
//     console.log(e);
//   }
// });

app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
