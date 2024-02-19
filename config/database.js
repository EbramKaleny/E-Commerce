import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log("connection to db success");
    })
    // .catch((err) => {
    //   console.error(`error db: ${err}`);
    //   process.exit(1);
    // });
};

export { dbConnection };
