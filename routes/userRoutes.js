const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddlewere = require("../middlewares/authMiddlewere");

const router = express.Router();

//routes
//get user || GET
router.get("/getUser", authMiddlewere, getUserController);

//update profile
router.put("/updateUser", authMiddlewere, updateUserController);

//update password
router.post("/updatePassword", authMiddlewere, updatePasswordController);

//reset password
router.post("/resetPassword", authMiddlewere, resetPasswordController);

//delete profile
router.delete("/deleteUser/:id", authMiddlewere, deleteProfileController);

module.exports = router;
