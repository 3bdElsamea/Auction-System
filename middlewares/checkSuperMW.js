const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

module.exports = catchAsync(async (req, res, next) => {
  if (req.admin?.email !== process.env.SUPER_ADMIN_EMAIL)
    return next(
      new AppError("Only Super Admin is allowed to access this Route", 403)
    );
  next();
});
