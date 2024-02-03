const mongoose = require("mongoose");

// dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rajitdutta2002:One-2-three@cluster0.wf9jjeb.mongodb.net/my-blog"
    );
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.log("⚠️ MongoDB connection error -> ", error);
    process.exit(1);
  }
};

module.exports = { dbConnection };
