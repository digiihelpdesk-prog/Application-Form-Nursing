const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  // Hidden Fields
  applicationId: String,
  applicationDate: String,
  transactionId: String,
  transactionDate: String,

  // Personal Details
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  gender: String,
  dob: String,
  age: String,
  mobile: String,
  email: String,
  aadhar: String,
  category: String,

  // Permanent Address
  phouse: String,
  parea: String,
  pdistrict: String,
  pcity: String,
  pstate: String,
  ppin: String,

  // Correspondence Address
  chouse: String,
  carea: String,
  cdistrict: String,
  ccity: String,
  cstate: String,
  cpin: String,

  // 10th Details
  exam10: String,
  board10: String,
  school10: String,
  year10: String,
  maxMarks10: String,
  obtMarks10: String,
  percent10: String,

  // 12th Details
  exam12: String,
  board12: String,
  college12: String,
  year12: String,
  phymarks: String,
  chemarks: String,
  biomarks: String,
  engmarks: String,
  pcbPercent: String,
  subject12: String,

  // Documents (stored as base64 or file path)
  photo: String,
  signature: String,
  marksheet10: String,
  marksheet12: String,
  aadharCard: String,

}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);