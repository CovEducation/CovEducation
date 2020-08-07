import Parent, { Student } from './parent';

jest.mock('../providers/FirebaseProvider');

let parent;

beforeEach(() => {
    parent = new Parent(
        'test',
        'test@email.com',
        'CST',
        [new Student('teststudent', 'testm@email.com', 12, ['Math'])]
    );
});

test('constructor', () => {
    expect(parent.name).toBe('test');
    expect(parent.email).toBe('test@email.com');
    expect(parent.timezone).toBe('CST');
    const mentee = parent.mentees[0];
    expect(mentee.name).toBe('teststudent');
    expect(mentee.email).toBe('testm@email.com');
    expect(mentee.grade).toBe(12);
    expect(mentee.subjects[0]).toBe('Math');
});

test('validation', () => {
    // TODO: need to integrate Yup first
});

test('update', () => {
    // test to ensure the invalid cases fail
    expect(parent.update())
        .rejects.toEqual('Parent update failed: not initialized with firebase uid');
});

test('create', () => {
    try {
        const auth = { uid: 'this-is-a-uid' };
        parent.create(auth);
    } catch (err) {
        // this will be an undefined error since we mocked firebase
    }

    expect(parent.id).toBe('this-is-a-uid');
});

test('get', () => {
    // TODO: we need better mocks to test this.
});
