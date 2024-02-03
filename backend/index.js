const { dbConnection } = require("./db/index.js");
const {app} = require("./app.js");

dbConnection()
.then(() => {
    app.listen(3000, () => {
        console.log(`⚙️ Server is running at port : 3000`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed ⚠️ !!! ", err);
})