const express = require("express");
const dbconnection = require("./dbconnect/dbconnection");
const app = express();

dbconnection();

//Router
app.use('/user','./routers/userRouter');

app.post('/regiter',async(req,res)=>{
    //code
})

//Listening to the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening to the PORT ${PORT}`);
});
