const casual = require("casual");

console.log("Liu");
console.log(casual.city);

// random skaiciaus funkcija pasirasyti, kurioje galime irasyti nuo ..iki.. random skaicius ir ji grazinti

console.log(casual.integer((from = 10), (to = 25)));

// sukonstruoti user objektą iš casual random proerčių
// turi turėti vardą, pavardę, lytį, adrasas (objektas su šalis, miestas, gatvė), el. paštas, slaptažodis, metai (0-99), kuri mėn gimė., mėgstamiausia spalva
const user = casual.user;
let color = casual.random_value({ a: "violet", b: "red", c: "black" });
let birthmonth = casual.random_value({
  a: "january",
  b: "february",
  c: "march",
});

casual.define("user", function () {
  return {
    firstname: casual.first_name,
    lastname: casual.last_name,
    email: casual.email,
    password: casual.password,
    address: casual.address,
    color: color.random_value,
    birthmonth: birthmonth.random_value,
  };
});
console.log(casual.user);

// 'uuid' versiją 7.0.2
