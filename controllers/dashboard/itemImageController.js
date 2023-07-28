const { Readable } = require("stream");

const cloudinary = require("../../config/cloudinaryConfig");
const db = require("../../db/models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const ItemImages = db.Item_images;

exports.getAllItemImages = catchAsync(async (req, res) => {
  const itemImages = await ItemImages.findAll({
    where: {
      item_id: req.params.itemId,
    },
  });
  res.status(200).json({
    status: "success",
    results: itemImages.length,
    data: {
      itemImages,
    },
  });
});

// Upload item image to cloudinary and save the url to the database
exports.uploadItemImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("Please upload an image", 400));

  const buffer = req.file.buffer;
  const uploadRes = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        transformation: { width: 500, height: 500, crop: "limit" },
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);
  });

  const itemImage = await ItemImages.create({
    item_id: req.params.itemId,
    image: uploadRes.secure_url,
  });
  res.status(201).json({
    status: "success",
    data: {
      itemImage,
    },
  });
});

exports.deleteItemImage = catchAsync(async (req, res) => {
  const image = req.foundRecord;
  await req.foundRecord.destroy();
  const publicId = image.image.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy(publicId);

  res.json({
    message: "Image deleted successfully",
  });
});
