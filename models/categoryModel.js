const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://tse3.mm.bing.net/th?id=OIP.-Yyvp72aoLShDLLKl_-K0AAAAA&pid=Api&P=0&h=180",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
