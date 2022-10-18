const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
// dotenv
require("dotenv").config();
// connect to mongodb
const connect = require("./database/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("my secret"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// router

// app.use(function (req, res, next) {
//   if (!req.user) return next(createError(401, 'Please login to view this page.'))
//   next()
// })
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 500 error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`>>> App listening on port ${PORT}`);
});

module.exports = app;
