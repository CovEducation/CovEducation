const firebase = require('firebase-admin');

// eslint-disable-next-line consistent-return
async function firebaseMiddleware(req, res, next) {
  try {
    req.user = await firebase.auth()
      .verifyIdToken(req.query.token || req.query.headers.token || req.body.token);
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}

module.exports = firebaseMiddleware;
