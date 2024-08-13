const mongoose=require("mongoose")
const instituteschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true

    },
    websiteurl:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },address:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admins"

    }
})
const Institute=mongoose.model("institutes",instituteschema)
module.exports=Institute

