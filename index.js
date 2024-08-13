const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const app=express();
const cors=require("cors")
const bodyparser=require("body-parser")
app.use(express.json())
app.use(cors())
require("./config/db")
const userRoutes=require("./routes/userRoutes")
const forgetpassRoutes=require("./routes/forgetpassRoute")
const adminRoutes=require("./routes/adminRoutes")
app.use("/api/auth",userRoutes)
app.use("/api/password",forgetpassRoutes)
app.use("/api/admin",adminRoutes)

app.get("/",(req,res)=>{
    res.send("Hello from school digital")
})

//it uses port number for local testing
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


