const userCtrl = require("../controllers/userCtrl");
const router=require("express").Router();

router.post('/register',userCtrl.register);
router.get('/getusers',userCtrl.getUsers);
router.post('/signin',userCtrl.signin);

module.exports = router;