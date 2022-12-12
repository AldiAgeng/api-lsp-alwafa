const {body} = require('express-validator');
const {Administrator} = require('../models');

module.exports = {
  createValidation: [
    body('code_admin').notEmpty().withMessage('Code admin is required').custom(
      async (value) => {
        const user = await Administrator
          .findOne({
            where: {
              code_admin: value
            }
          });
        if (user) {
          throw new Error('Code admin already in use');
        }
      }
    ),
    body('name').notEmpty().withMessage('Name is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('certification_field').notEmpty().withMessage('Certification field is required'),
    body('phone_number').notEmpty().withMessage('Phone number is required'),
    body('username').notEmpty().withMessage('Username is required').custom(
      async (value) => {
        const user = await Administrator
          .findOne({
            where: {
              username: value
            }
          });
        if (user) {
          throw new Error('Username already in use');
        }
      }
    ),
    body('password').notEmpty().withMessage('Password is required').isStrongPassword().withMessage('Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
  ],

  updateValidation: [
    body('code_admin').custom(
      async (value = "", {req}) => {
        const codeAdmin = await Administrator.findOne({
            where: {
              code_admin: value
            }
          });

        const admin = await Administrator.findByPk(req.params.id);

        if (codeAdmin && admin.dataValues.code_admin !== value && codeAdmin.dataValues.id === req.params.id) {
          throw new Error('Code admin already in use');
        }
      }),
      body("username").custom(
        async (value = "", { req }) => {

          const admin = await Administrator.findOne({
            where: {
              id: req.params.id,
            },
          });

          const usernameAdmin = await Administrator.findOne({
            where: {
              username: value,
            },
          });
          if (usernameAdmin && admin.username !== req.params.username && usernameAdmin.username === req.params.username) {
            throw new Error("Username already in use");
          }
        }
      ),
    ],
}