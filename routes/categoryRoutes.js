const express = require("express");

const authMiddlewere = require("../middlewares/authMiddlewere");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
//create cat
router.post("/create", authMiddlewere, createCatController);

//get all cat
router.get("/getAll", getAllCatController);

//update cat
router.put("/update/:id", authMiddlewere, updateCatController);

//delete cat
router.delete("/delete/:id", authMiddlewere, deleteCatController);

module.exports = router;
