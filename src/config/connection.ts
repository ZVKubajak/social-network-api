import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/socialDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default databaseConnection;
