const mongoose=require("mongoose")
const bankschema=new mongoose.Schema({
    bankname:{
        type:String,
        required:true
    },
    accountnumber:{
        type:String,
        required:true
    },
    branchadress:{
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
const Bank= mongoose.model("banks",bankschema)
module.exports=Bank;
