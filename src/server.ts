import express from "express";
import databaseConnection from "./config/connection.js";
import routes from "./routes/index.js";

await databaseConnection();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// (async () => {

  // mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}.`);
    });
  // });
// })();
