import { Auth, Db} from './index';

test('module exports', () => {
    expect(Auth).toBeTruthy();
    expect(Db).toBeTruthy();
})