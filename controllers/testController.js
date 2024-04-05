const testuserController = (req, res) => {
  try {
    res.status(200).send("<h1>test User Data</h1>");
  } catch (error) {
    console.log("error in test API", error);
  }
};

module.exports = { testuserController };
