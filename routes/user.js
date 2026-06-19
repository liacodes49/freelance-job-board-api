const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");
const { registerValidator, loginValidator } = require("../validators/user");
const validate = require("../middleware/validate");

router.post("/register", registerValidator, validate, userController.register);
router.post("/login", loginValidator, validate, userController.login);

module.exports = router;
