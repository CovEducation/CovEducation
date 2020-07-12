const express = require('express');

const router = express.Router();

// Utils.

const getMentors = (tags, subjects) => {
  if (tags !== undefined && subjects !== undefined) return [];
  return [];
};

// Gets a list of mentors, optionally accepts tags and subject filters.
router.get('/mentors', (req, res) => {
  const tags = req.query.tags || [];
  const subjects = req.query.subjects || [];
  // TODO(johancc) - Integrate with firebase to get a list of mentors.
  const mentors = getMentors(tags, subjects);
  res.send(mentors);
});

module.exports = router;
