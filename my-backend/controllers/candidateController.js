const Candidate = require('../models/Candidate');
const { sendApplicationEmail } = require('../middleware/emailService');

console.log('sendApplicationEmail:', sendApplicationEmail);

// Submit Application
exports.submitApplication = async (req, res) => {
  try {
    console.log('📥 Request received:', req.body.email);
    const candidate = await Candidate.create(req.body);
    console.log('💾 Candidate saved:', candidate._id);
    
    // Send confirmation email
    try {
      console.log('📧 Sending email to:', candidate.email);
      await sendApplicationEmail(candidate);
      console.log('✅ Email sent successfully to:', candidate.email);
    } catch (emailErr) {
      console.error('❌ Email error:', emailErr.message);
    }

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully!',
      applicationId: candidate.applicationId,
      data: candidate 
    });
  } catch (err) {
    console.error('❌ Submit error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json({ success: true, count: candidates.length, data: candidates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Candidate
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
    res.json({ success: true, data: candidate });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Candidate
exports.deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Candidate deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};