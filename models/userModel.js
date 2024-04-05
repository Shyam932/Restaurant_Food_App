const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vender", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://in.images.search.yahoo.com/search/images?p=user+image&fr=mcafee&type=E210IN0G0&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F574%2F512%2Flarge_2x%2Fvector-sign-of-user-icon.jpg#id=3&iurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F574%2F512%2Flarge_2x%2Fvector-sign-of-user-icon.jpg&action=click",
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
