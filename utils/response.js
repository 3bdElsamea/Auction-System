exports.success = (res, status, data = {}) => {
  res.status(status).json({
    status: "success",
    ...data,
  });
};
