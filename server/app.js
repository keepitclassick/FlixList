const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./db");
const dbHelpers = require("./db/helpers/dbHelpers")(db);
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(fileUpload());

app.use("/", indexRouter);
app.use("/api/users", usersRouter(dbHelpers));
app.use("/api/login", loginRouter(dbHelpers));

module.exports = app;
