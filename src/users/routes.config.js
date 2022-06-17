const UsersController = require("./controller/users.controller");
const UserValidationMiddleware = require("./middleware/users.middleware");

exports.routesConfig = function (app) {
  /***
   * @route   POST /api/users
   * @desc    Create new user record
   * @access  Public
   * ***/
  app.post("/api/users", [
    UserValidationMiddleware.validateUserBodyFields,
    UserValidationMiddleware.CheckIfUserAlreadyExists,
    UsersController.createUser,
  ]);

  /***
   * @route   GET /api/users
   * @desc    Get user record
   * @access  Private
   * ***/
  app.get("/api/users", [
    UserValidationMiddleware.validReqBodyNeeded,
    UserValidationMiddleware.validateUser,
    UsersController.getUserRecords,
  ]);

  /***
   * @route   PATCH /api/users/:userId
   * @desc    Update user record by valid userId
   * @access  Public
   * ***/
  app.patch("/api/users/:userId", [
    UserValidationMiddleware.validateUserExists,
    UserValidationMiddleware.validateUserBodyFields,
    UsersController.patchUserById,
  ]);

  /***
   * @route   DELETE /api/users/:userId
   * @desc    Delete user record by valid userId
   * @access  Public.
   * ***/
  app.delete("/api/users/:userId", UsersController.removeUserById);
};
