const get = jest.fn();
const set = jest.fn();
const verifyIdToken = jest.fn();

const doc = jest.fn(() => ({
  get: get,
  collection: collection,
}));

const collection = jest.fn(() => ({
  get: get,
  doc: doc,
}));

const batch = jest.fn(() => ({
  set: set,
  commit: jest.fn(),
}));

module.exports = {
  firestore: jest.fn(() => ({
    batch: batch,
    collection: collection,
    doc: doc,
    settings: jest.fn()
  })),

  initializeApp: jest.fn(),
  credential: { cert : jest.fn() },

  auth: jest.fn(() => ({
    verifyIdToken: verifyIdToken
  }))
};
