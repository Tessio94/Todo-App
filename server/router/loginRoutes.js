const { register, login, logout } = require("../controller/loginController");
const { auth } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.route("/current-user").post(auth, register);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
