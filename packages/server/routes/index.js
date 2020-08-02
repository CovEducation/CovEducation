const express = require('express');
const firebaseMiddleware = require('./auth');

const router = express.Router();

router.get('/heartbeat', (req, res) => {
  res.send('coved api is working');
});

router.get('/auth', firebaseMiddleware, (req, res) => {
  res.send('Auth works.');
});

module.exports = router;
