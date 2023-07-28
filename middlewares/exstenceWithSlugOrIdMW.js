const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const db = require("../db/models");
/*
 * this middleware is used to check the existence of the desired record in the database
 * before performing any operation on it or returning it to the user allowed to access it
 * */

module.exports = (finder, Model) =>
  catchAsync(async (req, res, next) => {
    let user;
    if (finder.toLowerCase().includes("slug")) {
      user = await db[Model].findBySlug(req.params[finder]);
    } else if (finder.toLowerCase().includes("id")) {
      user = await db[Model].findByPk(req.params[finder]);
    }
    if (!user) return next(new AppError(`${Model} not found`, 404));
    req.foundRecord = user;
    next();
  });
