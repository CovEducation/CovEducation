const get = jest.fn();
const set = jest.fn();
const verifyIdToken = jest.fn();

let collection;
const doc = jest.fn(() => ({
  get,
  collection,
}));

collection = jest.fn(() => ({
  get,
  doc,
}));

const batch = jest.fn(() => ({
  set,
  commit: jest.fn(),
}));

module.exports = {
  firestore: jest.fn(() => ({
    batch,
    collection,
    doc,
    settings: jest.fn(),
  })),

  initializeApp: jest.fn(),
  credential: { cert: jest.fn() },

  auth: jest.fn(() => ({
    verifyIdToken,
  })),
};
