const jwt = require('jsonwebtoken');
const {Administrator} = require("../models");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    

    req.user = await Administrator.findOne({
      where: {
        id: decoded.id,
      },
    });

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      statusCode: 401,
      name: "Unauthorized",
      message: "You are not login/access_token is wrong",
    });
  }
}