const { body } = require('express-validator');

module.exports = {
  createCompetencyTestPlace : [
    body('name').notEmpty().withMessage('name is required'),
    body('address').notEmpty().withMessage('address is required'),
    body('phone_number').isMobilePhone(['id-ID']).withMessage('phone number indonesia only').notEmpty().withMessage('phone number is required')
  ]
}