const firebase = require('firebase-admin');

async function authMiddleware(req, res, next) {
    try {
        req.user = await firebase.auth().verifyIdToken(req.query.token || req.headers.token || req.body.token);
        next();
    } catch (err) {
        console.log('Error authenticated API request: ' + err);
        res.sendStatus(403);
    }
}

module.exports = authMiddleware;