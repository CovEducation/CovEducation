const firebase = require('firebase-admin');

async function authMiddleware(req, res, next) {
  try {
    req.user = await firebase.auth()
      .verifyIdToken(req.query.token || req.headers.token || req.body.token);
    next();
  } catch (err) {
    res.status(403).send(`Error authenticated API request: ${err}`);
  }
}

module.exports = authMiddleware;
