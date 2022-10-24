const mongoose = require("mongoose");

const dbconnection = async() => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Anshuman", () => {
      console.log("db connection successful");
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = dbconnection;
