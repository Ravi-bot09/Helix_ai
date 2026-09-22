const mongoose=require("mongoose");
// database connection string 
require('dotenv').config({path:"./config/config.env"})
async function connectDB(){
   
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("connectd to db")
}
module.exports=connectDB