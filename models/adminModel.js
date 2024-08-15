const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const adminschema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        enum:["1","2","3"],
        required:true

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, role: {
        type: String,
        default: "admin",
      }, isActive: {
        type: Boolean,
        default: false,
      },
      address:{
        type:String
      },
      emailtoken: {
        type: String,
      },
})
adminschema.pre('save',async function(next){

    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
   
    }
    next();
})
const Admin=new mongoose.model("admins",adminschema);
module.exports=Admin;