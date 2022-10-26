const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
// dotenv
require("dotenv").config();
// connect to mongodb
const connect = require("./database/db");

const authRoute = require("./routes/authRoute");
const usersRouter = require("./routes/users");
const tuitionBillRouter = require("./routes/tuitionBill");

const app = express();
connect();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "none",
    },
  })
);

// router

// app.use(function (req, res, next) {
//   if (!req.user) return next(createError(401, 'Please login to view this page.'))
//   next()
// })
app.use("/v1/api/auth", authRoute);
app.use("/v1/api/users", usersRouter);
app.use("/v1/api/tuition-bill", tuitionBillRouter);

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
  res.status(500).json({message: err});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`>>> App listening on port ${PORT}`);
});

module.exports = app;
