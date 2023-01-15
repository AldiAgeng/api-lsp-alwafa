require('dotenv').config()
const jwt = require('jsonwebtoken');
const {Administrator} = require("../models");
module.exports = {
  async authAdmin (req, res, next) {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      req.user = await Administrator.findOne({
        where: {
          id: decoded.id,
          username: decoded.username,
        },
      });

      if (!req.user) {
        return res.status(403).json({
          status: "fail",
          statusCode: 403,
          name: "Forbidden",
          message: "You are not allowed to access this resource",
        })
      }else {
        next();
      }
    } catch (error) {
      return res.status(401).json({
        status: "fail",
        statusCode: 401,
        name: "Unauthorized",
        message: "You are not login/access_token is wrong",
      });
    }
  },
  // async authAssessor (req, res, next) {
  //   try {
  //     const token = req.headers.authorization.split("Bearer ")[1];
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //     req.user = await Assessor.findOne({
  //       where: {
  //         id: decoded.id,
  //         username: decoded.username,
  //       },
  //     });

  //     next();
  //   } catch (error) {
  //     return res.status(401).json({
  //       status: "fail",
  //       statusCode: 401,
  //       name: "Unauthorized",
  //       message: "You are not login/access_token is wrong",
  //     });
  //   }
  // },
} 
