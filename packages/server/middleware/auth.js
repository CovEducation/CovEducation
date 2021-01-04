const firebase = require('firebase-admin');

async function authMiddleware(req, res, next) {
  try {
    // The token should only ever be sent in a header.
    req.user = await firebase.auth()
      .verifyIdToken(req.headers.token);
    next();
  } catch (err) {
    res.status(403).send(`Error authenticated API request: ${err}`);
  }
}


module.exports = authMiddleware;
