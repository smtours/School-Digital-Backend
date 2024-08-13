const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const bcrypt=require("bcrypt")

const models={
    Student:require("../models/studentModel"),
    Teacher:require("../models/teacherModel"),
    Admin:require("../models/teacherModel"),
    Superadmin:require("../models/superadminModel"),
    Accountant:require("../models/accountantModel"),
    Parent:require("../models/parentModel")
}

const resetpass=async(req,res)=>{
    const { email } = req.body;
    try {
        let foundUser = null;
        let userRole = null;
        for (let role in models) {
            const Model = models[role];
            const user = await Model.findOne({ email: email });
            if (user) {
                foundUser = user;
                userRole = role;
                break;
            }
        }
       
        if(foundUser){
            const secretKey = foundUser._id + process.env.SECRETKEY;
            const token = jwt.sign({ UserId: foundUser._id }, secretKey, {
                expiresIn: '5m'
            });
            const link = `${process.env.FRONTENDURL}/resetpass/${foundUser._id}/${token}`;
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: process.env.USERGMAILNAME,
                    pass: process.env.PASSWORD
                }
            });
            let mailOptions = {
                from: process.env.USERGMAILNAME,
                to: email,
                subject: 'Password Reset',
                text: `You can reset your password through this link: ${link}`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Error sending email.');
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).send('Password reset email sent.');
                }
            });

        }else {
            return res.status(401).send('User not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error.');
    }
}
const resetpasscompletely = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { id, token } = req.params;
    try {
        let foundModel = null;

        // Iterate over all the models to find which one contains the user
        for (let role in models) {
            const Model = models[role];
            const user = await Model.findById(id);
            if (user) {
                foundModel = Model;
                break;
            }
        }

        // Check if the user was found in any model
        if (!foundModel) {
            return res.status(401).send('User not found.');
        }

        // Check if the new password matches the confirm password
        if (newPassword !== confirmPassword) {
            return res.status(401).send('Password and confirm password should be the same.');
        }

        // Verify the token with the secret key used during generation
        const secretKey = id + process.env.SECRETKEY;
        jwt.verify(token, secretKey); // This will throw an error if the token is not valid or expired

        // Hash the new password
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, genSalt);

        // Update the password using findByIdAndUpdate
        const updatedUser = await foundModel.findByIdAndUpdate(
            id,
            { $set: { password: hashedPassword } },
            { new: true } // Optionally return the updated document
        );

        if (!updatedUser) {
            return res.status(401).send('Password update failed.');
        }

        return res.status(201).send('Password has been changed successfully.');
    } catch (error) {
        return res.status(500).send('Internal server error: ' + error.message);
    }
};

module.exports={resetpass,resetpasscompletely}
