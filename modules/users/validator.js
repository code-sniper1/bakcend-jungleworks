const joi = require("joi");

const validateUser = function (user) {
  const joiSchema = joi
    .object({
      name: joi.string().min(3).max(20).required(),
      phone: joi.string().min(10).max(20).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      address: joi.string().required(),
    })
    .options({ abortEarly: false });

  return joiSchema.validate(user);
};

const validateUserUpdate = function (user) {
  const joiSchema = joi
    .object({
      name: joi.string().min(3).max(20).required(),
      phone: joi.string().min(10).max(20).required(),
      email: joi.string().email().required(),
      address: joi.string().required(),
    })
    .options({ abortEarly: false });

  return joiSchema.validate(user);
};

const signupValidate = function (req, res, next) {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;

  const user = {
    name: name,
    email: email,
    phone: phone,
    password: password,
    address: address,
  };
  const resp = validateUser(user);
  if (resp.error) {
    console.log("Data not valid.");
    res.send("Validation failed");
    return;
  }
  next();
};

const updateValidate = function (req, res, next) {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;

  const user = {
    name: name,
    email: email,
    phone: phone,
    address: address,
  };
  const resp = validateUserUpdate(user);
  if (resp.error) {
    console.log("Data not valid.");
    res.send("Validation failed");
    return;
  }
  next();
};

module.exports = { signupValidate, updateValidate };
