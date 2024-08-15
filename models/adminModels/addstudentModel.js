const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  studentCNIC: { type: String, required: true, unique: true },
  bloodGroup: { type: String },
  dateOfBirth: { type: Date, required: true },
  religion: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },

  admissionDate: { type: Date, required: true },
  admissionNumber:{type:Number,},
  className: { type: String, required: true },
  section: { type: String, required: true },
  rollNo: { type: String, unique: true },
  studentImage: { type: String }, // URL to the image file

  fathersName: { type: String, required: true },
  fathersPhoneNo: { type: String, required: true },
  fathersOccupation: { type: String },
  mothersName: { type: String, required: true },
  mothersPhoneNo: { type: String, required: true },
  mothersOccupation: { type: String },
  fathersCNIC: { type: String, required: true },
admin:{type:mongoose.Schema.Types.ObjectId,ref:"admins"}
  
},{timestamps:true});

const AddStudent = mongoose.model('allstudents', studentSchema);

module.exports = AddStudent;
