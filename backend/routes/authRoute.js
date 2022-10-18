const express = require("express");
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", middlewareController.verifyToken, authController.logout);
module.exports = router;
