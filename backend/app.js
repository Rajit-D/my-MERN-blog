const express = require("express");
const userRoute = require("./routes/user.route.js");
const authRoute = require("./routes/auth.route.js");

const app = express();

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

module.exports = { app };
