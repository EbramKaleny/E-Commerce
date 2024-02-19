export const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "development") {
    sendErrInDevMode(err, res);
  } else if (process.env.NODE_ENV == "production ") {
    sendErrInProdMode(err, res);
  } else {
    sendErrInStageMode(err, res);
  }
};

const sendErrInDevMode = (err, res) => {
  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrInStageMode = (err, res) => {
  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
  });
};

const sendErrInProdMode = (err, res) => {
  return res.json({
    status: err.status,
    message: err.message,
  });
};
