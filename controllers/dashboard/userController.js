const db = require("../../db/models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const User = db.User;
module.exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.scope("customResponse").findAll();
  res.status(200).json({ status: "success", data: users });
});

module.exports.getUser = catchAsync(async (req, res, next) => {
  const user = req.foundRecord;
  res.status(200).json({ status: "success", data: user });
});

module.exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = catchAsync(async (req, res, next) => {
  const user = req.foundRecord;
  const updatedUser = await user.update(req.body);
  res.status(200).json({ status: "success", data: updatedUser });
});

module.exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = req.foundRecord;
  await user.destroy();
  res.json({
    status: "success",
    message: "User deleted successfully(soft delete)",
  });
});

module.exports.restoreUser = catchAsync(async (req, res, next) => {
  const user = await User.findBySlug(req.params.slug, { paranoid: false });
  if (!user) return next(new AppError("User not found", 404));
  await user.restore();
  res.status(200).json({
    status: "success",
    message: "User restored successfully",
  });
});
