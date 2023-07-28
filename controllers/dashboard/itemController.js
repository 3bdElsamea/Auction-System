const catchAsync = require("../../utils/catchAsync");
const db = require("../../db/models");

const Item = db.Item;

exports.getAllItems = catchAsync(async (req, res) => {
  const items = await Item.findAll();
  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
    },
  });
});

exports.getItem = catchAsync(async (req, res) => {
  const item = req.foundRecord;
  res.status(200).json({
    status: "success",
    data: item,
  });
});

exports.createItem = catchAsync(async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json({
    status: "success",
    data: item,
  });
});

exports.updateItem = catchAsync(async (req, res) => {
  const item = await req.foundRecord.update(req.body);
  res.status(200).json({
    status: "success",
    data: item,
  });
});
