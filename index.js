require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const createError = require("http-errors");
require("./config/db-connection");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors());
// API Logs
app.use(logger("dev"));

const PORT = process.env.PORT || 3002;

const { success } = require("./config/messages.js");

/**
 * Initialize routes
 */
app.get("/", (req, res, next) => {
  return res.json({
    status: 200,
    message: success,
  });
});

app.use(require("./middlewares/jwt.middleware"));
app.use(require("./modules"));

/**
 * Handle unhandled exception
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res
    .status(err.status || 500)
    .send({ status: err.status, message: err.message, data: {} });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
