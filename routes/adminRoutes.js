const express=require("express")
const router=express.Router()
const {getAllStudents,getAllEmployers,getAllParents,addOrUpdateInstitute}=require("../controllers/adminController");
const fetchUser = require("../middleware/fetchUser");
router.get("/getallstudents",fetchUser,getAllStudents)
router.get("/getallemployers",fetchUser,getAllEmployers)
router.get("/getallparents",fetchUser,getAllParents)
router.post("/addinstitute",fetchUser,addOrUpdateInstitute)

module.exports=router;