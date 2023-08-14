const jwt = require("jsonwebtoken");

const db = require("../db/models");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const getModel = require("../utils/getModel");

const Admin = db.Admin;
const User = db.User;

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new appError("Invalid Token", 401);
  }
};

const checkUserExists = async (role, userId) => {
  const user = await getModel(role).findByPk(userId);
  if (!user) {
    throw new appError(`Unauthorized - ${role} doesn't Exist.`, 404);
  }
  return user;
};

module.exports = (role) =>
  catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new appError("Unauthorized - No Bearer Token Provided", 401));
    }
    const token = authHeader.split(" ")[1];

    const decodedToken = verifyToken(token);
    if (decodedToken.role !== role) {
      return next(
        new appError(`Unauthorized - Only ${role}s Can access this route`)
      );
    }

    if (role === "Admin") {
      req.admin = await checkUserExists(role, decodedToken.userId);
    } else if (role === "User") {
      req.user = await checkUserExists(role, decodedToken.userId);
    }

    next();
  });
