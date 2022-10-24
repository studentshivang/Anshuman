const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username:{
    type:String,
    required:true
  },
  contact:{
    type:String,
    required:true
  },
  address:{
    type:String
  }
});

const UserModel = mongoose.model("USER",userSchema);

module.exports=UserModel;
