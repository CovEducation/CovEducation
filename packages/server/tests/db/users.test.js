const firebase = require('firebase-admin');
const userDb = require('../../db/users');

jest.mock('firebase-admin');

describe('Test User Database Actions', () => {
  test('getUser', async () => {
    const db = firebase.firestore();
    const { get } = db.collection().doc();

    const mockDocRef = {
      exists: true,
      data: jest.fn(),
    };

    mockDocRef.data.mockReturnValueOnce({ role: 'MENTOR' });
    get.mockReturnValueOnce(mockDocRef);

    mockDocRef.data.mockReturnValueOnce({ value: 'this is my user' });
    get.mockReturnValueOnce(mockDocRef);

    const user = await userDb.getUser('asdf');

    expect(get).toHaveBeenCalledTimes(2);
    expect(user).toStrictEqual({ role: 'MENTOR', value: 'this is my user', uid: 'asdf' });
  });
});
