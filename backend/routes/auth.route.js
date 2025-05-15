const express = require("express");
const router = express.Router();
const userRegister = require("../middleware/userRegister");
const userLogin = require("../middleware/userLogin");
const registerController = require("../controller/register.controller")
const loginController = require("../controller/login.controller")

router.post("/login",userLogin,loginController);

router.post("/register",userRegister,registerController);

module.exports = router