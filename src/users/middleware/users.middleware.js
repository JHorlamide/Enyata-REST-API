const UserModel = require("../../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const regReqBodyValidation = (reqBodyFields) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(320).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().min(5).max(12).required(),
  });

  return schema.validate(reqBodyFields);
};

const reqBodyValidation = (reqBodyFields) => {
  const schema = Joi.object({
    email: Joi.string().max(320).required(),
    password: Joi.string().min(5).max(12).required(),
  });

  return schema.validate(reqBodyFields);
};

exports.validateUserBodyFields = (req, res, next) => {
  const { error } = regReqBodyValidation(req.body);

  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error.details[0].message });
  }

  next();
};

exports.validReqBodyNeeded = (req, res, next) => {
  const { error } = reqBodyValidation(req.body);

  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error.details[0].message });
  }

  next();
};

exports.CheckIfUserAlreadyExists = async (req, res, next) => {
  const user = await UserModel.findOne({ where: { email: req.body.email } });

  if (user) {
    return res.status(400).send({
      status: false,
      message: "A user with the credential already exits",
    });
  }

  next();
};

exports.validateUser = async (req, res, next) => {
  const user_exists = await UserModel.findOne({
    where: { email: req.body.email },
  });

  if (user_exists) {
    const passwordHash = user_exists.password;

    if (await bcrypt.compare(req.body.password, passwordHash)) {
      return next();
    }
  }

  // Giving the same message in both cases
  // helps protect against cracking attempts:
  res
    .status(400)
    .send({ status: false, message: ["Invalid email and/or password"] });
};

exports.validateUserExists = async (req, res, next) => {
  const user_exists = await UserModel.findByPk(req.params.userId);

  if (user_exists) {
    return next();
  }

  res.status(404).send({ status: false, message: "User does not exists" });
};
