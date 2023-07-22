const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const getModel = require("../utils/getModel");

module.exports = (role) =>
  catchAsync(async (req, res, next) => {
    const decodedUser = role === "Admin" ? req.admin : req.user;
    const user = await getModel(role).findByPk(decodedUser?.id);
    if (!user) return next(new AppError(`${role} not found`, 404));
    req.existingUser = user;
    next();
  });
