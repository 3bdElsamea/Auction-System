const path = require("path");
const fs = require("fs");
const multer = require("multer");

// file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype))
    return cb(new Error("Only images are allowed"), false);
  cb(null, true);
};

// limit
const limit = {
  fileSize: 5 * 1024 * 1024,
};

module.exports = multer({
  limits: limit,
  fileFilter: fileFilter,
});
