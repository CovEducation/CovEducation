import useAuth, { AuthProvider } from './index';
import {renderHook, act} from '@testing-library/react-hooks'
import { Auth } from '../FirebaseProvider';

test('module exports', () => {
    expect(useAuth).toBeTruthy();
    expect(AuthProvider).toBeTruthy();
})


test('useAuth', () => {
    const provider = ({ children }) => <AuthProvider fallback={'loading'}>{children}</AuthProvider>;
    const { value } = renderHook(() => useAuth(), { provider });

    // Note: the hook needs to be tested; however, the AuthProvider component does
    // not render it's children until `auth` is not `AUTH_STATE.UNINITIALiZED`.

});

