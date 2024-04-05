const express = require("express");

const authMiddlewere = require("../middlewares/authMiddlewere");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/restorentController");

const router = express.Router();

//routes
//create restorent || Post
router.post("/create", authMiddlewere, createResturantController);

///get all resturant
router.get("/getAll", getAllResturantController);

///get resturant by id || get
router.get("/get/:id", getResturantByIdController);

//delete restorent || delete
router.delete("/delete/:id", authMiddlewere, deleteResturantController);

module.exports = router;
