const express=require("express")
const router=express.Router()
const {getAllStudents,getAllEmployers,getAllParents}=require("../controllers/adminController");
const fetchUser = require("../middleware/fetchUser");
router.get("/getallstudents",fetchUser,getAllStudents)
router.get("/getallemployers",fetchUser,getAllEmployers)
router.get("/getallparents",fetchUser,getAllEmployers)

module.exports=router;