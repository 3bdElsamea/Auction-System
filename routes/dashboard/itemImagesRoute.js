const express = require("express");
const existenceMW = require("../../middlewares/exstenceWithSlugOrIdMW");
const {
  getAllItemImages,
  uploadItemImage,
  deleteItemImage,
} = require("../../controllers/dashboard/itemImageController");

const imageUpload = require("../../utils/uploadImage");

const router = express.Router();

router
  .route("/:itemId/images")
  .all(existenceMW("itemId", "Item"))
  .get(getAllItemImages)
  .post(imageUpload.single("image"), uploadItemImage);

router
  .route("/:itemId/images/:imageId")
  .all(existenceMW("itemId", "Item"))
  .delete(existenceMW("imageId", "Item_images"), deleteItemImage);

module.exports = router;
