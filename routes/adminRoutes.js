const express=require("express")
const router=express.Router()
const {getAllStudents,getAllEmployers,getAllParents,addOrUpdateInstitute,
addbankdetails,updateaccountsetting,addemployee,getemployeedetails,addstudent,getallstudents
}=require("../controllers/adminController");
const fetchUser = require("../middleware/fetchUser");
router.get("/getallstudents",fetchUser,getAllStudents)
router.get("/getallemployers",fetchUser,getAllEmployers)
router.get("/getallparents",fetchUser,getAllParents)
router.post("/addinstitute",fetchUser,addOrUpdateInstitute)
router.post("/addbankdetails",fetchUser,addbankdetails)
router.post("/updateaccountsetting",fetchUser,updateaccountsetting)
router.post("/addemployee",fetchUser,addemployee)
router.get("/getemployees",fetchUser,getemployeedetails)
router.post("/addstudent",fetchUser,addstudent)
router.get("/getstudents",fetchUser,getallstudents)

module.exports=router;