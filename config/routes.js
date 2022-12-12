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
apiRouter.get("/api/v1/administrator", controllers.api.v1.administrator.getAllAdministrator);
apiRouter.get("/api/v1/administrator/:id", controllers.api.v1.administrator.getAdministratorById);
apiRouter.post("/api/v1/administrator",
  validations.administratorValidation.createValidation, 
  middlewares.bodyMiddleware, 
  controllers.api.v1.administrator.createAdministrator
  );
apiRouter.patch("/api/v1/administrator/:id", /* validations.administratorValidation.updateValidation, middlewares.bodyMiddleware, */ controllers.api.v1.administrator.updateAdministrator);
apiRouter.delete("/api/v1/administrator/:id", controllers.api.v1.administrator.deleteAdministrator);

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
