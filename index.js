require("dotenv").config();
const express = require("express");
const dbconnection = require("./dbconnect/dbconnection");
const CookieParser=require("cookie-parser");
const app = express();
dbconnection();

app.use(express.json());
app.use(CookieParser());

//Router
app.use('/user',require('./router/userRouter'));

//Listening to the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening to the PORT ${PORT}`);
});
