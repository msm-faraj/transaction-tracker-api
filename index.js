require("dotenv").config();
const auth = require("./middleware/auth");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const athenticator = require("./authenticator");
const express = require("express");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const accountsRouter = require("./routes/accounts");
const categoriesRouter = require("./routes/categories");
const transactionsRouter = require("./routes/transactions");
const app = express();
const port = process.env.PORT || 3000;

if (!process.env.expense_tracker_jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
console.log(`env: ${process.env.NODE_ENV}`);

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/accounts", auth, accountsRouter);
app.use("/api/categories", auth, categoriesRouter);
app.use("/api/transactions", auth, transactionsRouter);

if (app.get("env") === "development") {
  app.use(athenticator);
  console.log("Morgan enabled...");
}

app.listen(port, () => {
  console.log(`React-Expence-Tracker listening of port ${port}`);
});
