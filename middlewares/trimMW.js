module.exports = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string")
        req.body[key] = req.body[key].trim();
    });
  }
  next();
};
