const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/auth');

/* GET users listing. */
router.get('/', authMiddleware, (req, res) => {
  res.send('succesfully authenticated with firebase');
});

module.exports = router;
