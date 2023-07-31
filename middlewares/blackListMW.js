module.exports = (blackListArray) => {
  return (req, res, next) => {
    blackListArray.forEach((el) => delete req.body[el]);
    next();
  };
};
