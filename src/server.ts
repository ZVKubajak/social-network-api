import express from "express";
import databaseConnection from "./config/connection";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
  await databaseConnection();

  mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}.`);
    });
  });
})();
