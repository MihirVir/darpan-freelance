const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer_config");
const { verifyToken } = require("../config/verify_token");
const { createHotel, getHotel } = require("../controllers/hotel_controller");
router.post("/upload", verifyToken, upload.array("imgs"), createHotel);
router.get("/:location", getHotel);
module.exports = router;
