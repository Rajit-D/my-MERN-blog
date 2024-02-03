const express = require("express");
const userRoute = require("./routes/user.route.js");

const app = express();

app.use("/api/user", userRoute);

app.listen(3000, () => {
  console.log("🌐 Server is running on port 3000...");
});
