const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        // if login success, create access token and refresh token
        const accesstoken = createAccessToken({ id: user._id });
        const refreshtoken = createRefreshToken({ id: user._id });

        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, //7d
        });

        res.json({ accesstoken });
        // res.status(200).json({
        //   success: true,
        //   data: user,
        //   msg: "Registration successful",
        // });
      } else {
        res.status(400).json({ success: false, msg: "User already exists!" }); //ok bro
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: "Registration failed!" });
      console.log(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const id=req.user.id;
      const result = await UserModel.findById(id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, msg: "Operation failed!" });
      console.log(error);
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      // console.log(users);

      if (!user) throw new Error("No user found!");
      const result = await bcrypt.compare(password, user.password);
      if (!result) throw new Error("Invalid credentials!");

      // if login success, create access token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      });

      res.json({success: true, accesstoken });
    } catch (error) {
      res.status(400).json({ success: false, msg: "Login failed!" });
      console.log(error);
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken",{path:'/user/refresh_token'})
      return res.json({msg:"Logged Out"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
module.exports = userCtrl;
