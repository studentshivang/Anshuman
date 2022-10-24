const express = require("express");
const dbconnection = require("./dbconnect/dbconnection");
const app = express();

dbconnection();



//Listening to the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening to the PORT ${PORT}`);
});