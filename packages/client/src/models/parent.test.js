import Parent, { Student } from './parent';

jest.mock('../providers/FirebaseProvider');

let parent;

beforeEach(() => {
    parent = new Parent(
        'test',
        'test@email.com',
        '123-456-7890',
        'he/him',
        'google.com',
        'CST',
        '0',
        [new Student('teststudent', 'testm@email.com', 12, ['Math'])]
    );
});

test('constructor', () => {
    expect(parent.name).toBe('test');
    expect(parent.email).toBe('test@email.com');
    expect(parent.phone).toBe('123-456-7890');
    expect(parent.pronouns).toBe('he/him');
    expect(parent.avatar).toBe('google.com');
    expect(parent.number_requests).toBe('0');
    expect(parent.timezone).toBe('CST');
    const student = parent.students[0];
    expect(student.name).toBe('teststudent');
    expect(student.email).toBe('testm@email.com');
    expect(student.grade).toBe(12);
    expect(student.subjects[0]).toBe('Math');
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

test('image', () => {
    // TODO: need to verify if images work with better mocks
});
