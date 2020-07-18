import { } from '../providers/FirebaseProvider';
import Mentor from './mentor';

jest.mock('../providers/FirebaseProvider');

let mentor;

beforeEach(() => {
    mentor = new Mentor(
        'test',
        'test@email.com',
        'CST',
        'hello',
        ['Math'],
        []
    );
})

test('constructor', () => {
    expect(mentor.name).toBe('test');
    expect(mentor.email).toBe('test@email.com');
    expect(mentor.timezone).toBe('CST');
    expect(mentor.about).toBe('hello');
    expect(mentor.id).toBeFalsy();
    expect(mentor.subjects.length).toBe(1);
    expect(mentor.tags.length).toBe(0);
});


test('validation', () => {
    // TODO: need to integrate Yup first
});


test('update', () => {
    // test to ensure the invalid cases fail
    expect(mentor.update())
        .rejects.toEqual('Mentor update failed: not initialized with firebase uid');
});

test('create', () => {
    try {
        const auth = { uid: 'this-is-a-uid' };
        mentor.create(auth);
    } catch (err) {
        // this will be a undefined error since we mocked firebase
    }

    expect(mentor.id).toBe('this-is-a-uid');
});

test('get', () => {
    // TODO: we need better mocks to test this.
});
