const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      name: "BadRequest",
      message: errors.array().map((error) => error.msg),
    });
  }
  next();
}