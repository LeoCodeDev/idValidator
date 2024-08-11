const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { createValidation } = require("../controllers/createValidation");
const { uploadImage } = require("../controllers/uploadImage");
const { getValidation } = require("../controllers/getValidation");

router.post("/createValidation", createValidation);
router.post("/uploadImage", upload.array("images") ,uploadImage);
router.get("/getValidation/:validation_id", getValidation)

module.exports = router;
