const functions = require("firebase-functions");
const api = require("./app");

exports.api = functions.https.onRequest(api);
