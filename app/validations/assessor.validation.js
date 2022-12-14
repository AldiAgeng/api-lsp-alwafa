const {body} = require("express-validator");
const {Assessor} = require("../models");

module.exports = {
  createValidation: [
    body("code_assessor").notEmpty().
      withMessage("Code assessor is required").
      custom(async (value) => {
        const assessor = await Assessor.findOne({
          where: {
            code_assessor: value
          }
        });
        if(assessor){
          throw new Error("Code assessor already in use");
        }
      }),
    body("name").notEmpty().
      withMessage("Name is required"),
    body("certification_field").notEmpty().
      withMessage("Certification field is required"),
    body("phone_number").notEmpty().
      withMessage("Phone number is required"),
    body("username").notEmpty().
      withMessage("Username is required").
      custom(async (value) => {
        const assessor = await Assessor.findOne({
          where: {
            username: value
          }
        });
        if(assessor){
          throw new Error("Username already in use");
        }
      }),
    body("password").notEmpty().
      withMessage("Password is required").
      isStrongPassword().
      withMessage("Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character"),
  ]
}