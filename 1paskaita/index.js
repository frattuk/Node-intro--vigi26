const casual = require("casual");

console.log("Liu");
console.log(casual.city);

// random skaiciaus funkcija pasirasyti, kurioje galime irasyti nuo ..iki.. random skaicius ir ji grazinti

console.log(casual.integer((from = 10), (to = 25)));

// sukonstruoti user objektą iš casual random proerčių
// turi turėti vardą, pavardę, lytį, adrasas (objektas su šalis, miestas, gatvė), el. paštas, slaptažodis, metai (0-99), kuri mėn gimė., mėgstamiausia spalva
const user = casual.user;
const sex = ["male", "female", "other"];

casual.define("user", function () {
  return {
    firstname: casual.first_name,
    lastname: casual.last_name,
    sex: sex[casual.integer((from = 0), (to = 2))],
    email: casual.email,
    password: casual.password,
    address: casual.address,
    integer: casual.integer((from = 0), (to = 99)),
    month_name: casual.month_name,
    color_name: casual.color_name,
  };
});
console.log(casual.user);

// 'uuid' versiją 7.0.2
