const express = require("express");

const authMiddlewere = require("../middlewares/authMiddlewere");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  foodUpdateController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddlewere = require("../middlewares/adminMiddlewere");

const router = express.Router();

//create food routes
router.post("/create", authMiddlewere, createFoodController);

//get All food
router.get("/getAll", getAllFoodsController);

//getsingle food
router.get("/get/:id", getSingleFoodController);

//get food by restorent
router.get("/getByResturant/:id", getFoodByResturantController);

//UPDATE food
router.put("/update/:id", authMiddlewere, foodUpdateController);

//delete food
router.delete("/delete/:id", authMiddlewere, deleteFoodController);

//place order
router.post("/placeorder", authMiddlewere, placeOrderController);

//order status
router.post(
  "/orderStatus/:id",
  authMiddlewere,
  adminMiddlewere,
  orderStatusController
);

module.exports = router;
