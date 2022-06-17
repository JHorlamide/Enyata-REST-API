const UserModel = require("../../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(req.body.password, salt);
  
  const new_user = await UserModel.create({
    ...req.body,
    password: passwordHash,
  });

  res.status(201).send({ status: true, data: new_user });
};

exports.getUserRecords = async (req, res) => {
  const user_records = await UserModel.findOne({
    where: { email: req.body.email },
  });
  res.status(200).send({ status: true, data: user_records });
};

exports.patchUserById = async (req, res) => {
  let passwordHash;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    passwordHash = await bcrypt.hash(req.body.password, salt);
  }

  await UserModel.upsert({
    id: req.params.userId,
    ...req.body,
    password: passwordHash,
  });

  res.status(204).send({});
};

exports.removeUserById = async (req, res) => {
  const user_exists = await UserModel.findByPk(req.params.userId);

  if (user_exists) {
    await UserModel.destroy({ where: { id: req.params.userId } });
    return res.status(204).send({});
  };

  res.status(404).send({ status: false, message: "User does not exists" });
};
