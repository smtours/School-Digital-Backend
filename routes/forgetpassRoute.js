const express=require("express")
const router=express.Router()
const {resetpass,resetpasscompletely}=require("../controllers/forgetpassController")

router.post("/resetpass",resetpass)
router.put("/resetpass/:id/:token",resetpasscompletely)
module.exports=router;