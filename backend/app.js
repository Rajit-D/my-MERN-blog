const express = require("express");
const userRoute = require("./routes/user.route.js");
const authRoute = require("./routes/auth.route.js");
const postRoute = require("./routes/post.route.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

module.exports = { app };
