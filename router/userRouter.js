const userCtrl = require("../controllers/userCtrl");
const express=require(express);
const Router=express().router;

Router.post('/register',userCtrl.register);

Router.get('/allusers',userCtrl.getUsers);
