const { body } = require("express-validator");
const { CompetencyTestPlace } = require("../models");

module.exports = {
  createScheduleValidation: [
    body("scheme").notEmpty().withMessage("Scheme is required"),
    body("execution_time").notEmpty().withMessage("Execution time is required").isDate().withMessage("Execution time must be a date"),
    body("number_of_participants").notEmpty().withMessage("Number of participants is required").isNumeric().withMessage("Number of participants must be a number"),
    body("competency_test_place_id")
      .notEmpty()
      .withMessage("Competency test place id is required")
      .custom(async (value) => {
        const competencyTestPlace = await CompetencyTestPlace.findOne({
          where: {
            id: value,
          },
        });
        if (!competencyTestPlace) {
          throw new Error("Competency test place id not found");
        }
      }),
  ],
};
