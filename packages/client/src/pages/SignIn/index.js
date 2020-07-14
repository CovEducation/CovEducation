import React, { useState } from 'react';
import Text from '../../components/TextBox';
import Button from '../../components/Button';
import useAuth from '../../providers/AuthProvider'

const SignInPage = () => {
    const { user, signin, signout } = useAuth();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleChange = (event) => {
        if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    return (
        <>
            { JSON.stringify(user.auth) }
            <Text label="Email" id="email" placeholder="Email" value={email} onChange={handleChange}/>
            <Text label="Password" id="password" placeholder="Password" value={password} onChange={handleChange}/>
            <Button theme="default" size="md" onClick={() => signin(email, password)}>
                Sign In
            </Button>
            {/*<Button theme="default" size="md" onClick={() => signout()}>*/}
            {/*    Sign Out*/}
            {/*</Button>*/}
        </>
    )
}

export default SignInPage