const mongoose=require("mongoose");
const dotenv=require("dotenv").config()
mongoose.connect(process.env.MONGOURI).then(()=>{
    console.log("Connected to data base")
}).catch((e)=>{
    console.log(e.message)
})
