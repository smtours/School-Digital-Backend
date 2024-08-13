const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const app=express();
require("./config/db")
const userRoutes=require("./routes/userRoutes")
const forgetpassRoutes=require("./routes/forgetpassRoute")
const adminRoutes=require("./routes/adminRoutes")
app.use(express.json())
app.use("/api/auth",userRoutes)
app.use("/api/auth",forgetpassRoutes)
app.use("/api/admin",adminRoutes)

app.get("/",(req,res)=>{
    res.send("Hello from school digital")
})


app.listen(80,()=>{
    console.log("Server is running on port 80")
})


