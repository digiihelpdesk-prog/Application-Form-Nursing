const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS ? 'Loaded ✅' : 'NOT LOADED ❌');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendApplicationEmail = async (candidate) => {
    console.log('📧 sendApplicationEmail called for:', candidate.email);
  const mailOptions = {
    from: `"Vivek University" <${process.env.EMAIL_USER}>`,
    to: candidate.email,
    subject: `Application Received — ${candidate.applicationId} | Vivek University`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
        
        <div style="background:#1d2f6f;padding:20px;text-align:center;">
          <img src="cid:universitylogo" 
          alt="Vivek University Logo" 
          style="width:120px;height:65px;object-fit:contain;margin-bottom:10px;">
          <h2 style="color:white;margin:0;">Vivek University</h2>
          <p style="color:#ccc;margin:4px 0;">School of Nursing</p>
        </div>

        <div style="padding:30px;">
          <h3 style="color:#1d2f6f;">Dear ${candidate.fullName},</h3>
          <p>Your application for <strong>B.Sc Nursing</strong> has been received successfully!</p>

          <div style="background:#f0f4ff;border-left:4px solid #1d2f6f;padding:16px;margin:20px 0;border-radius:4px;">
            <h4 style="margin:0 0 10px;color:#1d2f6f;">📋 Application Details</h4>
            <p style="margin:4px 0;"><strong>Application No:</strong> ${candidate.applicationId}</p>
            <p style="margin:4px 0;"><strong>Application Date:</strong> ${candidate.applicationDate}</p>
            <p style="margin:4px 0;"><strong>Applicant Name:</strong> ${candidate.fullName}</p>
            <p style="margin:4px 0;"><strong>Father's Name:</strong> ${candidate.fatherName}</p>
            <p style="margin:4px 0;"><strong>Mobile:</strong> ${candidate.mobile}</p>
            <p style="margin:4px 0;"><strong>Email:</strong> ${candidate.email}</p>
            <p style="margin:4px 0;"><strong>Category:</strong> ${candidate.category}</p>
          </div>

          <div style="background:#fff8e1;border-left:4px solid #f4c542;padding:16px;margin:20px 0;border-radius:4px;">
            <h4 style="margin:0 0 10px;color:#1d2f6f;">💳 Payment Details</h4>
            <p style="margin:4px 0;"><strong>Transaction ID:</strong> ${candidate.transactionId}</p>
            <p style="margin:4px 0;"><strong>Transaction Date:</strong> ${candidate.transactionDate}</p>
            <p style="margin:4px 0;"><strong>Amount Paid:</strong> ₹1,000</p>
            <p style="margin:4px 0;"><strong>Payment Status:</strong> <span style="color:green;font-weight:bold;">✅ Successful</span></p>
          </div>

          <p style="color:#555;">Your admit card will be sent to this email once the application is reviewed and approved by the university.</p>

          <p style="color:#c0392b;font-size:13px;">⚠ Please keep your Application No <strong>${candidate.applicationId}</strong> and Transaction ID <strong>${candidate.transactionId}</strong> safe for future reference.</p>

          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
          <p style="color:#888;font-size:12px;text-align:center;">
            This is an auto-generated email. Please do not reply.<br>
            Vivek University — School of Nursing<br>
            Moradabad Road, Post Agri Bijnor (UP) 246701
          </p>
        </div>

      </div>
    `,
    attachments: [
      {
        filename: 'logo1.png',
        path: path.join(__dirname, '../logo1.png'),
        cid: 'universitylogo'
      }
    ]
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendApplicationEmail };