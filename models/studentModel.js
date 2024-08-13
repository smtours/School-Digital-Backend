const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const studentschema=mongoose.Schema({
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
        default: "student",
      }, isActive: {
        type: Boolean,
        default: false,
      },
      emailtoken: {
        type: String,
      },
})
studentschema.pre('save',async function(next){

    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
   
    }
    next();
})
const Student=new mongoose.model("students",studentschema);
module.exports=Student;