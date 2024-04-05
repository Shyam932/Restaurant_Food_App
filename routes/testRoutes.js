const express = require("express");
const { testuserController } = require("../controllers/testController");

//router object
const router = express.Router();

//routes get|post|update|delete
router.get("/test-user", testuserController);

//export
module.exports = router;
