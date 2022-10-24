const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const userCtrl = {
  register: async (req, res) => {
    try {
      // const name=req.body.name;
      // const email=req.body.email;
      // const password=req.body.password;
      // const cpassword=req.body.cpassword;
      // const contact=req.body.contact;
      // const address=req.body.address;

      const { username, email, password, cpassword, contact, address } =
        req.body;
      const users = await UserModel.findOne({ email });
      if (!users) {
        if (password !== cpassword) {
          throw new Error("Password and confirm password do not match!");
        }
        if (contact.length > 13) {
          throw new Error("Incorrect Credentials");
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = UserModel({
          username,
          email,
          password: passwordHash,
          contact,
          address,
        });
        await user.save();
        res.status(200).json({
          success: true,
          data: user,
          msg: "Registration successful",
        });
      } else {
        res.status(400).json({ success: false, msg: "User already exists!" }); //ok bro
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: "Registration failed!" });
      console.log(error);
    }
  },
  getUsers: async (req, res) => {
    try {
      const result = await UserModel.find();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, msg: "Operation failed!" });
      console.log(error);
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } =req.body;
      const users = await UserModel.findOne({ email });
      console.log(users);
        
        res.status(200).json({
          success: true,
          msg: "Login successful",
        });
      
    } catch (error) {
      res.status(400).json({ success: false, msg: "Login failed!" });
      console.log(error);
    }
  },
};
module.exports = userCtrl;
