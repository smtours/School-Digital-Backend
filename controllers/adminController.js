const Parent = require("../models/parentModel")
const Student = require("../models/studentModel")
const Teacher = require("../models/teacherModel")
const Institute=require("../models/adminModels/instituteModel")
const Bank = require("../models/adminModels/bankModel")
const Admin = require("../models/adminModel")
const Employee = require("../models/adminModels/employeeModel")
const crypto=require("crypto")
const AddStudent = require("../models/adminModels/addstudentModel")

function generateShortHexId(length) {
    return crypto.randomBytes(length).toString('hex').substring(0, length);
}

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
        const allemployers=await Employee.find({})
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

const addbankdetails=async(req,res)=>{
    const {bankname,accountnumber,branchadress,logo}=req.body;
    try {
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"You are not allowed"})
        }
        let bank=await Bank.findOne()
        if(bank){
            bank.bankname=bankname || bank.bankname;
            bank.branchadress=branchadress || bank.branchadress;
            bank.accountnumber=accountnumber || bank.accountnumber;
            bank.logo=logo|| bank.logo

            await bank.save()
            return res.status(201).json({message:"Bank Account information updated",bank})
        }else{
            const newbank=new Bank({
                bankname,
                branchadress,
                logo,
                accountnumber,
                admin:req.user.id
            })
            await newbank.save()
            return res.status(201).json({message:"Bank information created",newbank})
        }
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
}
const updateaccountsetting=async(req,res)=>{
    const {username,email,address,password}=req.body;
    try {
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"You are not allowed"})
        }
        const user=await Admin.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (username) user.username = username;
        if (email) user.email = email;
        if (address) user.address = address;
        if (password) user.password = password; 

        // Save the updated user
        await user.save();

        // Respond with success
        return res.status(200).json({ message: "Account settings updated successfully", user });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}
const addemployee=async(req,res)=>{
    const {
        personalDetails,
        joiningDetails,
        qualificationDetails
      } = req.body;
      try {
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"You are not allowed"})

        }
        const newEmployee = new Employee({
            personalDetails,
            joiningDetails,
            qualificationDetails,
            admin:req.user.id
          });
      
          await newEmployee.save();
      
          res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
}
const getemployeedetails=async(req,res)=>{
 try {
    if(req.user.role!=="admin"){
        return res.status(401).json({message:"You are not allowed"})

    }
    const allemployee=await Employee.find({admin:req.user.id})
    return res.status(201).json(allemployee)
 } catch (error) {
    res.status(500).json({ message: 'Server error' ,error});
    
 }
}
const addstudent=async(req,res)=>{
    const {
        firstName, lastName, gender, studentCNIC, bloodGroup, dateOfBirth,
        religion, phoneNo, address, country, city,
        admissionDate, className, section, rollNo, studentImage,
        fathersName, fathersPhoneNo, fathersOccupation, mothersName,
        mothersPhoneNo, mothersOccupation, fathersCNIC
      } = req.body;
      try {
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"You are not allowed"})

        }
        const student = new AddStudent({
            firstName, lastName, gender, studentCNIC, bloodGroup, dateOfBirth,
            religion, phoneNo, address, country, city,
            admissionDate, className, section, rollNo, studentImage,
            fathersName, fathersPhoneNo, fathersOccupation, mothersName,
            mothersPhoneNo, mothersOccupation, fathersCNIC,
            admin:req.user.id
          });
      
          await student.save();
          res.status(201).json({ message: 'Student added successfully!', student });
      } catch (error) {
        res.status(500).json({ message: 'Failed to add student', error: error.message });
      }
}
const getallstudents=async(req,res)=>{
    try {
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"You are not allowed"})

        }
        const getstudents=await AddStudent.find()
        res.status(201).json(getstudents)
    } catch (error) {
        res.status(500).json({ message: 'Failed to loads student', error: error.message });
        
    }
}

module.exports={getAllStudents,getAllEmployers,getAllParents,addOrUpdateInstitute,
addbankdetails,updateaccountsetting,addemployee,getemployeedetails,addstudent,getallstudents
}
