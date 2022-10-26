const express = require("express");
const router = express.Router();
const tuitionController = require("../controllers/tuitionBillController");


router.post("/add-tuition-bill", tuitionController.addTuitionBill);


module.exports = router;