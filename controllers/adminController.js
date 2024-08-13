const Parent = require("../models/parentModel")
const Student = require("../models/studentModel")
const Teacher = require("../models/teacherModel")
const Institute=require("../models/adminModels/instituteModel")

const dotenv=require("dotenv").config()

const getAllStudents=async(req,res)=>{
    try {
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"Not Allowed"})
        }
        const allstudents=await Student.find({})
        res.status(201).json(allstudents)
    } catch (error) {
        res.status(401).json({message:error.message})
        
    }
}
const getAllEmployers=async(req,res)=>{
    try {
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"Not Allowed"})
        }
        const allemployers=await Teacher.find({})
        res.status(201).json(allemployers)
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
const getAllParents=async(req,res)=>{
    try {
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"Not Allowed"})
        }
        const allparents=await Parent.find({})
        res.status(201).json(allparents)
    } catch (error) {
        res.status(401).json({error:error.message})
        
    }
}
const addOrUpdateInstitute = async (req, res) => {
    const { name, description, logo, country, address, phonenumber, websiteurl } = req.body;
    
    try {
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"Not Allowed"})
        }
        // Check if there is an existing institute
        let institute = await Institute.findOne();

        if (institute) {
            // If an institute exists, update its information
            institute.name = name || institute.name;
            institute.description = description || institute.description;
            institute.logo = logo || institute.logo;
            institute.country = country || institute.country;
            institute.address = address || institute.address;
            institute.phonenumber = phonenumber || institute.phonenumber;
            institute.websiteurl = websiteurl || institute.websiteurl;

            await institute.save();
            return res.status(200).json({ message: 'Institute information updated successfully.', institute });
        } else {
            // If no institute exists, create a new one
            const newInstitute = new Institute({
                name,
                description,
                logo,
                country,
                address,
                phonenumber,
                websiteurl,
                admin:req.user.id
            });

            await newInstitute.save();
            return res.status(201).json({ message: 'Institute created successfully.', newInstitute });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
module.exports={getAllStudents,getAllEmployers,getAllParents,addOrUpdateInstitute}
