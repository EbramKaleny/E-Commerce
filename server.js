import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./config/database.js";
import { router as categoryRoute } from "./routes/categoryRoute.js";
import { apiError } from "./utils/apiErrorHandler.js";
import { globalError } from "./middleware/errorMiddleware.js";
dotenv.config({ path: "config.env" });

const app = express();
dbConnection();

app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`currently running in ${process.env.NODE_ENV} mode`);
}

app.use("/categories", categoryRoute);
app.all("*", (req, res, next) => {
  next(new apiError(`can't find this route: ${req.originalUrl}`, 400));
});
app.use(globalError);
const PORT = process.env.PORT || 8000;
const listen = app.listen(PORT, () =>
  console.log(`app listening on port: ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`unhandled error: ${err.name} | ${err.message}`);
  listen.close(() => {
    console.log("shutting down the server");
    process.exit(1);
  });
});
