const express = require("express");
const {
  userSignup,
  userLogin,
  getUser,
  getUserCount,
  getAllUsers,
  editUser,
  deleteUser,
  resetPass,
  checkRole
} = require("./controller");
const { signupValidate, updateValidate } = require("./validator");
const router = express.Router();

router.post("/signup", signupValidate, userSignup);
router.post("/login", userLogin);
router.get("/profile", getUser);
router.get("/userCount", getUserCount);
router.get("/allUsers", getAllUsers);
router.post("/editUser", updateValidate, editUser);
router.get("/getUser", getUser);
router.post("/updateUser", updateValidate, editUser);
router.delete("/deleteUser", deleteUser);
router.patch("/resetPass", resetPass);
router.get("/checkRole",checkRole)

module.exports = router;
