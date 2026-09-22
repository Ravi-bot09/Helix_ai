const app=require("./app");
const connectDB=require("./db/db")
connectDB().then(
app.listen(3000,()=>{
    console.log("server connected");
})
)