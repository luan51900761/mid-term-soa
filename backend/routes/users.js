const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/pay-tuition", userController.payTuition);
router.post("/create-transaction", userController.createTransaction);
router.get("/test", userController.test);
router.post("/get-user", userController.getUser);

module.exports = router;
