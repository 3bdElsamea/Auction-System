const jwt = require("jsonwebtoken");

const db = require("../db/models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const getModel = require("../utils/getModel");

const Admin = db.Admin;
const User = db.User;

const createToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = catchAsync(async (req, res, next) => {
  if (req.body.password !== req.body.confirm_password) {
    return next(new AppError("Passwords do not match", 400));
  }

  const user = await User.create(req.body);
  const token = createToken(user.id, "User");
  res.status(201).json({
    status: "success",
    token,
  });
});

exports.login = (role) =>
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError("Please provide email and password", 400));

    const user = await getModel(role).findByEmail(email);

    if (!user || !(await user.authenticate(password)))
      return next(new AppError("Incorrect email or password", 401));

    const token = createToken(user.id, role);

    res.status(200).json({
      status: "success",
      token,
      user,
    });
  });

exports.myProfile = catchAsync(async (req, res, next) => {
  const user = req.existingUser;
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  delete req.body.password;
  const user = await req.existingUser.update(req.body);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const user = req.existingUser;
  if (!(await user.authenticate(oldPassword)))
    return next(new AppError("Incorrect old password", 400));
  if (newPassword !== confirmNewPassword)
    return next(new AppError("Passwords do not match", 400));
  await user.update({ password: newPassword });
  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findByEmail(req.body.email);
  if (!user) return next(new AppError(`User not found`, 404));
  const resetToken = createToken(user.id, "User");
  user.reset_token = resetToken;
  user.reset_token_expires_at = Date.now() + 10 * 60 * 1000;
  await user.save({ validate: false });
  res.status(200).json({
    status: "success",
    token: resetToken,
    message: "Password reset token sent to email!",
  });
});
