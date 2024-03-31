
const jwt = require("jsonwebtoken");
const appError = require("../utils/errorCreator");

const verifToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return next (appError("unauthorized", 401))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(appError("unauthorized", 401));
      req.user = user;
      next();
    });
  };
  module.exports = verifToken