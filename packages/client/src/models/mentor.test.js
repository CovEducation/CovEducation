import Mentor from './mentor';
jest.mock('../providers/FirebaseProvider');

let mentor;

beforeEach(() => {
    mentor = new Mentor(
        'test',
        'test@email.com',
        '123-456-7890',
        'he/him',
        'MIT Class of 2021',
        'https://images.unsplash.com/photo-1583006479542-4d67993b8d9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80',
        'Hey! My name is Test. Johnny Test.',
        ['Time Traveling', 'Dog Talking'],
        'CST',
        ['Sword Fighting'],
        ['ESL', 'FE-Unite'],
        ['Elementary School'],
    );
});

test('constructor', () => {
    expect(mentor.name).toBe('test');
    expect(mentor.email).toBe('test@email.com');
    expect(mentor.phone).toBe('123-456-7890');
    expect(mentor.timezone).toBe('CST');
    expect(mentor.id).toBeFalsy();
    expect(mentor.subjects.length).toBe(1);
    expect(mentor.tags.length).toBe(2);
    expect(mentor.gradeLevels.length).toBe(1);
    expect(mentor.bio).toBe('Hey! My name is Test. Johnny Test.');
    expect(mentor.avatar.includes('https://')).toBe(true);
    expect(mentor.pronouns).toBe('he/him');
    expect(mentor.college).toBe('MIT Class of 2021');
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
        // console.log(err);
        // returns an undefined error along the lines of
        //  cannot read property 'doc' of undefined
    }

    expect(mentor.id).toBe('this-is-a-uid');
});

test('get', () => {
    // TODO: we need better mocks to test this.
});
