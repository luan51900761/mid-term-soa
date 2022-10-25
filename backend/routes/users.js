const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/pay-tuition", UserController.payTuition);
router.get("/test", UserController.test);
module.exports = router;
