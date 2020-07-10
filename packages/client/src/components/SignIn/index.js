import React, { useState } from 'react';
import Text from '../TextBox';
import Button from '../Button';

import { useAuth } from '../../providers/AuthProvider'

export function SignIn() {
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
        { JSON.stringify(user) }
        <Text label="Email" type="email" placeholder="Email" value={email} onChange={handleChange}/>
        <Text label="Password" type="password" placeholder="Password" value={password} onChange={handleChange}/>
        <Button theme="default" size="md" onClick={() => signin(email, password)}>
            Sign In
        </Button>
        <Button theme="default" size="md" onClick={() => signout()}>
            Sign Out
        </Button>
        </>
    )
}