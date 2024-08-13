const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const teacherschema=mongoose.Schema({
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
        default: "teacher",
      }, isActive: {
        type: Boolean,
        default: false,
      },
      emailtoken: {
        type: String,
      },
})
teacherschema.pre('save',async function(next){

    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
   
    }
    next();
})
const Teacher=new mongoose.model("teachers",teacherschema);
module.exports=Teacher;