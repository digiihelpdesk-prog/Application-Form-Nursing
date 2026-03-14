 const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getAllCandidates,
  getCandidateById,
  deleteCandidate
} = require('../controllers/candidateController');

// Submit Application
router.post('/submit', submitApplication);

// Get All Candidates
router.get('/all', getAllCandidates);

// Get Single Candidate
router.get('/:id', getCandidateById);

// Delete Candidate
router.delete('/:id', deleteCandidate);

module.exports = router;
