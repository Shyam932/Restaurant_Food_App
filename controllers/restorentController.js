const restorentModel = require("../models/restorentModel");

//CREATE RESTURANT
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newRestorent = new restorentModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestorent.save();

    res.status(201).send({
      success: true,
      message: "New Restorent Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Creating Restorent API",
      error,
    });
  }
};

//get all restorent
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await restorentModel.find({});
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Restorent Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Restorent API",
      error,
    });
  }
};

const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide restorent id",
      });
    }
    //find resturant
    const resturant = await restorentModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "No Restorent found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Restorent By Id API",
      error,
    });
  }
};

//delete resturant
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "No Resturant found Or Provide resturant ID",
      });
    }
    await restorentModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Restorent API",
      error,
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
