const express = require('express');
const algoliasearch = require('algoliasearch');
const authMiddleware = require('../middleware/auth');
const { generateFutureUnixTimestamp } = require('../utils');

require('dotenv').config();

const router = express.Router();

const { ALGOLIA_SEARCH_API_KEY, ALGOLIA_APP_ID } = process.env;
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

router.get('/heartbeat', (req, res) => {
  res.send('coved api is working');
});

/**
 * Returns a Secure Search-only Algolia API key for a user.
 * The client should request a new key everytime the user reloads the page,
 * as it will expire within an hour.
 * This is an authenticated endpoint.
 */
router.get('/algoliaKey', authMiddleware, (req, res) => {
  const publicKey = client.generateSecuredApiKey(
    ALGOLIA_SEARCH_API_KEY,
    {
      validUntil: generateFutureUnixTimestamp(3600),
      restrictIndices: ['prod_MENTORS'],
    },
  );
  res.send({ key: publicKey });
});

module.exports = router;
