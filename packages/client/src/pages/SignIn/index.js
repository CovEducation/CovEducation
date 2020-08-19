import React, { useState } from 'react';
import Text from '../../components/TextBox';
import Button from '../../components/Button';
import useAuth from '../../providers/AuthProvider'

const SignInPage = () => {
    const { auth, user, signin, signout } = useAuth();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ res, setRes ] = useState('');

    const handleChange = (event) => {
        if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const sendProtectedRequest = async (event) => {
        let token = '';
        try {
            token = await auth.getIdToken();
        } catch (err) {
            console.log(err);
        }
        const response = await fetch('/users', { headers: {token: token} });
        const message = await response.text();

        setRes(message);
    }

    return (
        <>
            { JSON.stringify(auth.uid) }
            { JSON.stringify(user) }
            { JSON.stringify(res)}
            <Text label="Email" id="email" placeholder="Email" value={email} onChange={handleChange}/>
            <Text label="Password" id="password" placeholder="Password" value={password} onChange={handleChange}/>
            <Button theme="default" size="md" onClick={() => signin(email, password)}>
                Sign In
            </Button>
            <Button theme="default" size="md" onClick={() => signout()}>
                Sign Out
            </Button>
            <Button theme="accent" size="md" onClick={() => sendProtectedRequest()}>
                Send Request
            </Button>
        </>
    )
}

export default SignInPage