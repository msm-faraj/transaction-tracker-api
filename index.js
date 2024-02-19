const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Users Routes Handlers
app.get("/api/users", (req, res) => {
  res.send("Hello Users!");
});

//Transactions Routes Handlers
app.get("/api/transactions", (req, res) => {
  res.send("Hello transactions!");
});

//Accounts Routes Handlers
app.get("/api/accounts", (req, res) => {
  res.send("Hello accounts!");
});

//Categories Routes Handlers
app.get("/api/categories", (req, res) => {
  res.send("Hello categories!");
});

app.listen(port, () => {
  console.log(`React-Expence-Tracker listening of port ${port}`);
});
