import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./config/database.js";
import { router as categoryRoute } from "./routes/categoryRoute.js";
dotenv.config({ path: "config.env" });

const app = express();
dbConnection();

app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`currently running in ${process.env.NODE_ENV} mode`);
}

app.use("/categories", categoryRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
