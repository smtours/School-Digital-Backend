const express=require("express")
const router=express.Router()
const {registerUser,verifyUser,loginUser}=require("../controllers/userController")
router.post("/register/student",(req,res)=>registerUser(req,res,require("../models/studentModel")))
router.post("/register/teacher",(req,res)=>registerUser(req,res,require("../models/teacherModel")))
router.post("/register/admin",(req,res)=>registerUser(req,res,require("../models/adminModel")))
router.post("/register/superadmin",(req,res)=>registerUser(req,res,require("../models/superadminModel")))
router.post("/register/parent",(req,res)=>registerUser(req,res,require("../models/parentModel")))
router.post("/register/accountant",(req,res)=>registerUser(req,res,require("../models/accountantModel")))
router.post("/login",loginUser)
router.get("/verify/:tokenlink", verifyUser);






module.exports=router;