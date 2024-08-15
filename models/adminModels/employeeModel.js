const mongoose=require("mongoose")
const crypto=require("crypto")
function generateNumericId(length) {
    const max = Math.pow(10, length) - 1;
    const min = Math.pow(10, length - 1);
    return (crypto.randomInt(min, max + 1)).toString();
}
const uniqueid=generateNumericId(3)
const employeeSchema = new mongoose.Schema({
    personalDetails: {
      employeeName: { type: String, required: true },
      fatherName: { type: String, required: true },
      gender: { type: String, required: true },
      employeeCNIC: { type: String, required: true },
      bloodGroup: { type: String, required: false },
      dateOfBirth: { type: Date, required: true },
      religion: { type: String, required: false },
      phoneNo: { type: String, required: true },
      address: { type: String, required: true },
      country: { type: String, required: true },
      city: { type: String, required: true },
    },
    joiningDetails: {
      joiningDate: { type: Date, required: true },
      employeeType: { type: String, required: true },
      employeeCategory: { type: String, required: true },
      employeeID: { type: Number, default:uniqueid }, // Auto-generated or managed elsewhere
      salary: { type: Number, required: true },
      employeeImage: { type: String, required: false }, // Store image URL or path
    },
    qualificationDetails: {
      degree: { type: String, required: true },
      instituteName: { type: String, required: true },
      boardOrUniversity: { type: String, required: true },
      dateFrom: { type: Date, required: true },
      dateTo: { type: Date, required: true },
      obtainedMarks: { type: Number, required: true },
      totalMarks: { type: Number, required: true },
      percentage: { type: Number, required: true },
      foreignQualifications: { type: String, required: false },
      DMCFile: { type: String, required: false }, // Store file URL or path
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admins"
    }
  });
  
  const Employee = mongoose.model('Employees', employeeSchema);
  
  module.exports = Employee;