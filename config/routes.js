const express = require("express");
const controllers = require("../app/controllers");

const middlewares = require("../app/middlewares");
const validations = require("../app/validations");

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get("/", controllers.main.index);

/**
 * TODO: Implement your own API
 *       implementations
 */

// User Login
apiRouter.post("/api/v1/user/login", controllers.api.v1.user.login);

// Admin
apiRouter.get("/api/v1/administrator", middlewares.authMiddleware.authAdmin, controllers.api.v1.administrator.getAllAdministrator);
apiRouter.get("/api/v1/administrator/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.administrator.getAdministratorById);
apiRouter.post("/api/v1/administrator", middlewares.authMiddleware.authAdmin, validations.administratorValidation.createValidation, middlewares.bodyMiddleware, controllers.api.v1.administrator.createAdministrator);
apiRouter.patch("/api/v1/administrator/:id", middlewares.authMiddleware.authAdmin, /* validations.administratorValidation.updateValidation, middlewares.bodyMiddleware, */ controllers.api.v1.administrator.updateAdministrator);
apiRouter.delete("/api/v1/administrator/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.administrator.deleteAdministrator);

// Admin Manage User
// Assessor
apiRouter.get("/api/v1/admin/assessor", middlewares.authMiddleware.authAdmin, controllers.api.v1.assessor.getAllAssessors);
apiRouter.get("/api/v1/admin/assessor/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.assessor.getAssessorById);
apiRouter.post("/api/v1/admin/assessor", middlewares.authMiddleware.authAdmin, validations.assessorValidation.createValidation, middlewares.bodyMiddleware, controllers.api.v1.assessor.createAssessor);
apiRouter.patch("/api/v1/admin/assessor/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.assessor.updateAssessor);
apiRouter.delete("/api/v1/admin/assessor/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.assessor.deleteAssessor);
// Accession
apiRouter.get("/api/v1/admin/accession", middlewares.authMiddleware.authAdmin, controllers.api.v1.accession.getAllAccessions);
apiRouter.get("/api/v1/admin/accession/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.accession.getAccessionById);
apiRouter.post("/api/v1/admin/accession", middlewares.authMiddleware.authAdmin, validations.accessionValidation.createValidation, middlewares.bodyMiddleware, controllers.api.v1.accession.createAccession);
apiRouter.patch("/api/v1/admin/accession/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.accession.updateAccession);
apiRouter.delete("/api/v1/admin/accession/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.accession.deleteAccession);

// Competency Test Place
apiRouter.get("/api/v1/admin/competency-test-place", middlewares.authMiddleware.authAdmin, controllers.api.v1.competencyTestPlace.getAllCompetencyTestPlaces);
apiRouter.get("/api/v1/admin/competency-test-place/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.competencyTestPlace.getCompetencyTestPlaceById);
apiRouter.post(
  "/api/v1/admin/competency-test-place",
  middlewares.authMiddleware.authAdmin,
  validations.competencyTestPlaceValidation.createCompetencyTestPlace,
  middlewares.bodyMiddleware,
  controllers.api.v1.competencyTestPlace.createCompetencyTestPlace
);
apiRouter.patch("/api/v1/admin/competency-test-place/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.competencyTestPlace.updateCompetencyTestPlace);
apiRouter.delete("/api/v1/admin/competency-test-place/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.competencyTestPlace.deleteCompetencyTestPlace);

// Schedule
apiRouter.get("/api/v1/admin/schedule", middlewares.authMiddleware.authAdmin, controllers.api.v1.schedule.getAllSchedules);
apiRouter.get("/api/v1/admin/schedule/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.schedule.getScheduleById);
apiRouter.post("/api/v1/admin/schedule", middlewares.authMiddleware.authAdmin, validations.scheduleValidation.createScheduleValidation, middlewares.bodyMiddleware, controllers.api.v1.schedule.createSchedule);
apiRouter.patch("/api/v1/admin/schedule/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.schedule.updateSchedule);
apiRouter.delete("/api/v1/admin/schedule/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.schedule.deleteSchedule);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
appRouter.get("/errors", () => {
  throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;
