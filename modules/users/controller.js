const {
  saveData,
  checkData,
  getData,
  getCount,
  getUsers,
  editUserService,
  deleteUserService,
  resetPasswordService,
  checkRoleService,
} = require("./services");
const jwt = require("jsonwebtoken");
const secret_key = "JUNGLEWORKS";

const userSignup = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const img = req["files"].image.data;

  const token = jwt.sign(
    {
      email: email,
      password: password,
    },
    secret_key,
    {
      expiresIn: "7d",
    }
  );

  const ref_token = jwt.sign(
    {
      email: email,
      password: password,
    },
    secret_key,
    {
      expiresIn: "42d",
    }
  );

  try {
    const value = await saveData(
      name,
      phone,
      email,
      password,
      img,
      address,
      ref_token
    );
    res.send({
      status: 200,
      result: "Verified",
      token: token,
      ref_token: value[0],
    });
  } catch (error) {
    res.send({ status: 400, result: error });
  }
};

const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const token = jwt.sign(
    {
      email: email,
      password: password,
    },
    secret_key,
    {
      expiresIn: "7d",
    }
  );


  try {
    const value = await checkData(email, password);
    console.log(value);
    res.send({
      status: 200,
      result: "Verified",
      token: token,
      ref_token: value[0],
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 401, result: error });
  }
};

const getUser = async (req, res) => {
  const ref_token = req.headers.ref_token;

  try {
    const value = await getData(ref_token);
    res.send({ status: 200, result: value });
  } catch (error) {
    res.send({ status: 400, result: error });
  }
};

const getUserCount = async (req, res) => {
  try {
    const count = await getCount();
    res.send({ status: 200, result: count });
  } catch (error) {
    res.send({ status: 400, result: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.send({ status: 200, result: users });
  } catch (error) {
    res.send({ status: 400, result: error });
  }
};

const editUser = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  let img = null;
  if (req["files"]) {
    img = req["files"].image.data;
  }

  const ref_token = req.headers.ref_token;
  try {
    await editUserService(name, phone, email, address, img, ref_token);
    res.send({ status: 200, result: "Success" });
  } catch (error) {
    res.send({ status: 400, result: error });
  }
};

const deleteUser = async (req, res) => {
  const ref_token = req.headers.ref_token;

  try {
    await deleteUserService(ref_token);
    res.send({ status: 200, result: "Success" });
  } catch (error) {
    res.send({ status: 500, result: "Failure" });
  }
};

const resetPass = async (req, res) => {
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const ref_token = req.headers.ref_token;

  try {
    await resetPasswordService(ref_token, password, newPassword);
    res.send({ status: 200, result: "Success" });
  } catch (error) {
    res.send({ status: 400, result: error });
  }
};

const checkRole = async (req, res) => {
  const ref_token = req.headers.ref_token;
  console.log(ref_token);

  try {
    await checkRoleService(ref_token);
    res.send({ status: 200, result: true });
  } catch (error) {
    res.send({ status: 403, result: false });
  }
};

module.exports = {
  userSignup,
  userLogin,
  getUser,
  getUserCount,
  getAllUsers,
  editUser,
  deleteUser,
  resetPass,
  checkRole,
};
