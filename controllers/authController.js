const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../db/models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const getModel = require("../utils/getModel");
const { success } = require("../utils/response");

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
  success(res, 201, { token: token });
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
    success(res, 200, { token: token });
  });

exports.myProfile = catchAsync(async (req, res, next) => {
  const user = req.existingUser;
  success(res, 200, user);
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  delete req.body.password;
  const user = await req.existingUser.update(req.body);
  success(res, 200, { data: user });
});

exports.deleteMyProfile = catchAsync(async (req, res, next) => {
  await req.existingUser.destroy();
  success(res, 204, { message: "Profile deleted successfully" });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const user = req.existingUser;
  if (!(await user.authenticate(oldPassword)))
    return next(new AppError("Incorrect old password", 400));
  if (newPassword !== confirmNewPassword)
    return next(new AppError("Passwords do not match", 400));
  await user.update({ password: newPassword });
  success(res, 200, { message: "Password changed successfully" });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findByEmail(req.body.email);
  if (!user) return next(new AppError(`User not found`, 404));
  const resetToken = createToken(user.id, "User");
  user.reset_token = resetToken;
  user.reset_token_expires_at = Date.now() + 10 * 60 * 1000;
  await user.save({ validate: false });
  success(res, 200, {
    message: "Reset token sent to email",
    data: { resetToken },
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const user = await User.findByToken(req.params.token);
  if (!user || user.reset_token_expires_at < Date.now())
    return next(new AppError("Invalid or expired token", 400));
  if (password !== confirmPassword)
    return next(new AppError("Passwords do not match", 400));
  user.password = password;
  user.reset_token = null;
  user.reset_token_expires_at = null;
  await user.save();
  success(res, 200, { message: "Password reset successfully" });
});
