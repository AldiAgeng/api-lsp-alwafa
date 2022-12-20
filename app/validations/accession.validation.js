const {body} = require('express-validator');
const {Accession} = require('../models');

module.exports = {
  createValidation: [
    body('code_accession').notEmpty().withMessage('Code accession is required').custom(
      async (value) => {
        const accession = await Accession
          .findOne({
            where: {
              code_accession: value
            }
          });
        if (accession) {
          throw new Error('Code accession already in use');
        }
      }
    ),
    body('name').notEmpty().withMessage('Name is required'),
    body("type_of_certification").notEmpty().withMessage("Type of certification is required"),
    body("phone_number").notEmpty().withMessage("Phone number is required"),
    body("username").notEmpty().withMessage("Username is required").custom(
      async (value) => {
        const accession = await Accession
          .findOne({
            where: {
              username: value
            }
          });
        if (accession) {
          throw new Error('Username already in use');
        }
      }
    ),
    body("password").notEmpty().withMessage("Password is required").isStrongPassword().withMessage("Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character"),
  ],
}