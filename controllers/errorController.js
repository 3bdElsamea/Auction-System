const AppError = require("../utils/appError");
const handleDatabaseError = (err) => {
  const message = `Invalid Data`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  return new AppError(err.errors[0]["message"], 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

function handleFkConstraintErrorDB(err) {
  return new AppError(err.parent.detail, 403);
}

const devError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  if (err.isValidationError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  } else if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    devError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "SequelizeDatabaseError") error = handleDatabaseError(err);
    if (err.name === "SequelizeValidationError")
      error = handleValidationErrorDB(err);
    if (err.name === "SequelizeUniqueConstraintError")
      error = handleDuplicateFieldsDB(err);
    if (err.name === "SequelizeForeignKeyConstraintError")
      error = handleFkConstraintErrorDB(err);

    prodError(error, res);
  }
};
