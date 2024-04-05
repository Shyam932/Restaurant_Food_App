const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//create food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      discription,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !discription || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      discription,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creatw food api",
      error,
    });
  }
};

const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food item was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get All food api",
      error,
    });
  }
};

//get single food
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "please provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found found with this food id",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get single food api",
      error,
    });
  }
};

//get food by resturant id
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide food id",
      });
    }
    const food = await foodModel.find({ resturant: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found found with this food id",
      });
    }

    res.status(200).send({
      success: true,
      message: "food based on resturant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get single food api",
      error,
    });
  }
};

const foodUpdateController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found ",
      });
    }
    const {
      title,
      discription,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    const updatedfood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        discription,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "food item is updated",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in food update api",
      error,
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide valid food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found ",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "food item is deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in food delete api",
      error,
    });
  }
};

//order placed
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please add food cart or payment method",
      });
    }

    let total = 0;
    //calculate
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in place order api",
      error,
    });
  }
};

//change order status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "please provide valid order id",
      });
    }

    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "order status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in order status api",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  foodUpdateController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
