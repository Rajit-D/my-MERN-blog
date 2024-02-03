const mongoose = require("mongoose");

dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.log("⚠️ MongoDB connection error -> ", error);
    process.exit(1);
  }
};

export default dbConnection;
