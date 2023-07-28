const db = require("../../db/models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Op } = require("sequelize");

const Admin = db.Admin;

module.exports.getAllAdmins = catchAsync(async (req, res) => {
  const admins = await Admin.scope("customResponse").findAll({
    where: { email: { [Op.ne]: process.env.SUPER_ADMIN_EMAIL } },
  });
  res.status(200).json({ status: "success", data: admins });
});

module.exports.getAdmin = catchAsync(async (req, res) => {
  const admin = req.foundRecord;
  res.status(200).json({ status: "success", data: admin });
});

module.exports.createAdmin = catchAsync(async (req, res) => {
  const admin = await Admin.create(req.body);
  res.status(201).json({ status: "success", data: admin });
});

module.exports.updateAdmin = catchAsync(async (req, res) => {
  const admin = req.foundRecord;
  const updatedAdmin = await admin.update(req.body);
  res.status(200).json({ status: "success", data: updatedAdmin });
});

module.exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const admin = req.foundRecord;
  const options = {};
  if (req.body.deleteOption === "hard") {
    options.force = true;
  } else if (req.body.deleteOption !== "soft") {
    return next(
      new AppError(
        "Invalid delete option. Please specify either 'soft' or 'hard'",
        400
      )
    );
  }
  await admin.destroy(options);
  res.json({
    status: "success",
    message: "Admin deleted successfully",
  });
});

// restore admin
module.exports.restoreAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findBySlug(req.params.slug, { paranoid: false });
  if (!admin) return next(new AppError("Admin not found", 404));
  await admin.restore();
  res.json({
    status: "success",
    message: "Admin restored successfully",
  });
});
