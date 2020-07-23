const express = require('express');

const router = express.Router();

// Firebase boilerplate.
const admin = require('firebase-admin');

const db = admin.firestore();

const mentorsRef = db.collection('mentors');

const getMentors = async (gradeLevel, subjects, specialNeeds) => {
  mentorsRef.where('subjects', 'array-contains', subjects)
    .where('gradeLevel', 'array-contains', gradeLevel)
    .where('subjects', 'array-contains', specialNeeds);
};

// Gets a list of mentors, optionally accepts tags and subject filters.
router.get('/', (req, res) => {
  const gradeLevel = req.query.gradeLevel || [];
  const subjects = req.query.subjects || [];
  const specialNeeds = req.query.specialNeeds || [];

  getMentors(gradeLevel, subjects, specialNeeds).then((mentors) => {
    res.send(mentors);
  }).catch((err) => res.sendStatus(500).json(err));
});

module.exports = router;
