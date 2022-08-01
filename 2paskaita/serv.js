const http = require("http");
const hostname = "127.0.0.1";

const port = 3002;

const cars = [
  { name: "BMW" },
  { name: "VW" },
  { name: "Toyota" },
  { name: "Mazda" },
];

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
  res.writeHead(200, headers);

  switch (req.url) {
    case "/cars":
      res.write(JSON.stringify(cars));
      res.end();

      break;

    default:
      res.write(JSON.stringify([]));
      res.end();
  }
});

server.listen(port, () => {
  console.log(`Serveris paleistas http://${hostname}:${port}/`);
});
