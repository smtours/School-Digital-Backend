const Student=require("../models/studentModel")
const Teacher=require("../models/teacherModel")
const Admin=require("../models/adminModel")
const Parent=require("../models/parentModel")
const Superadmin=require("../models/superadminModel")
const Accountant =require("../models/accountantModel")
const Principal=require("../models/principalModel")
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.USERGMAILNAME,
        pass: process.env.PASSWORD
    }
});


const registerUser = async (req, res, Model) => {
  const { username, email, password, branch } = req.body;
  try {
      let user = await Model.findOne({ email });
      if (user && user.isActive) {
          return res.status(401).json({ message: "User already exists and is active." });
      }

      let verificationUrl;

      if (user && !user.isActive) {
          // User exists but is not active, generate a new email verification token
          const emailtoken = jwt.sign({ email }, process.env.SECRETKEY, { expiresIn: '10m' });
          user.emailtoken = emailtoken;
          await user.save(); // Update the user with the new token

          // Generate verification URL
          const rolelink = jwt.sign({
              email: user.email,
              role: user.role
          }, process.env.SECRETKEY);

          verificationUrl = `${process.env.FRONTENDURL}/verify/${rolelink}`;
      } else {
          // User doesn't exist, create a new user
         

          const emailtoken = jwt.sign({ email }, process.env.SECRETKEY, { expiresIn: '10m' });
          const newUser = new Model({
              username,
              email,
              password,
              branch,
              emailtoken,
              isActive: false,
          });

          user = await newUser.save(); // Save the new user

          const rolelink = jwt.sign({
              email: user.email,
              role: user.role
          }, process.env.SECRETKEY);

          verificationUrl = `${process.env.FRONTENDURL}/verify/${rolelink}`;
      }

      // Send the verification email
      await transporter.sendMail({
          from: process.env.USERGMAILNAME,
          to: email,
          subject: 'Email Verification',
          text: verificationUrl
      });

      res.status(201).json({ message: "Please check your email for verification.", user });
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
    try {
        const { tokenlink } = req.params;

        // Decode the token to get email and role
        jwt.verify(tokenlink, process.env.SECRETKEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid or expired verification token." });
            }
            console.log("Decoded Token:", decoded);

            // Select the model dynamically based on role
            let Model;
            switch (decoded.role) {
                case 'student':
                    Model = require("../models/studentModel");
                    break;
                case 'teacher':
                    Model = require("../models/teacherModel");
                    break;
                case 'admin':
                    Model = require("../models/adminModel");
                    break;
                case 'superadmin':
                    Model = require("../models/superadminModel");
                    break;
                case 'principal':
                    Model = require("../models/principalModel");
                    break;
                case 'accountant':
                    Model = require("../models/accountantModel");
                    break;
                case 'parent':
                    Model = require("../models/parentModel");
                    break;
                // Add more cases as needed
                default:
                    return res.status(400).json({ message: "Invalid role." });
            }

            // Find user by email from the decoded token
            const user = await Model.findOne({ email: decoded.email });
            if (!user) {
                return res.status(400).json({ message: "Invalid verification token." });
            }

            // Activate the user's account
            user.isActive = true;
            user.emailtoken = undefined;
            await user.save();

            res.status(200).json({ message: "Account verified successfully." });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const loginUser=async(req,res)=>{
   const {email,password}=req.body;
   try {
       let user=null;
       let role='';
       user=await Student.findOne({email})
       if(user){
        role="student"
       }
       if(!user){
        user=await Teacher.findOne({email})
        if(user){
            role="teacher"
        }
       }
       if(!user){
        user=await Admin.findOne({email})
        if(user){
            role="admin"
        }
       }
       if(!user){
        user=await Superadmin.findOne({email})
        if(user){
            role="superadmin"
        }
       }
       if(!user){
        user=await Parent.findOne({email})
        if(user){
            role="parent"
        }
       }
       if(!user){
        user=await Accountant.findOne({email})
        if(user){
            role="accountant"
        }
       }
       if(!user){
        user=await Principal.findOne({email})
        if(user){
            role="principal"
        }
       }
       if (!user || !user.isActive) {
        return res.status(401).json({ message: "Invalid credentials or account not active." });
    }
    console.log("User's stored hashed password:", user.password);
    console.log("Entered raw password:", password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Debug: Log the result of password comparison
    console.log("Password comparison result:", isPasswordValid);
   
    const comparepassword=await bcrypt.compare(password,user.password)
    if(!comparepassword){
        return res.status(401).json({message:"Invalid credentials"})
    }

    const token = jwt.sign(
        { id: user._id, role },
        process.env.SECRETKEY
    );
    res.status(200).json({ token, role });
   } catch (error) {
    res.status(401).send(error)
   }
}

module.exports = { registerUser, verifyUser,loginUser };
