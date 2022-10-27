const userCtrl = require("../controllers/userCtrl");
const router = require("express").Router();
const auth = require("../middlewares/auth");

router.post("/register", userCtrl.register);
router.get("/getuser", auth, userCtrl.getUser);
router.post("/signin", userCtrl.signin);
router.post("/logout", userCtrl.logout);
router.get("/refresh_token", userCtrl.refreshToken);

module.exports = router;
