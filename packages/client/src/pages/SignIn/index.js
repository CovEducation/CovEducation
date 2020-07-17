import React, { useState, useEffect } from 'react';
import Text from '../../components/TextBox';
import Button from '../../components/Button';

import useAuth  from '../../providers/AuthProvider';
import { Mentor, Mentee } from '../../models';


const SignInPage = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const { auth, user, signin, signout, signup } = useAuth();

    const handleSignUp = () => {
        signup("sanjay.yepuri@gmail.com", "abc123", new Mentor(
            "Sanjay Yepuri",
            "sanjay.yepuri@gmail.com",
            "CST",
            "I am sanjay.",
            ["Math", "Physics"],
            ["High School"]
        )).catch(err => console.log(err));
    }

    const handleChange = (event) => {
        if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleSignIn = () => {
        signin(email, password)
            .catch(err => console.log(err));
    }

    const addMentee = () => {

        if (user.parent) {
            user.parent.mentees.push(new Mentee("Bob", "bob@email.com", 10, ["math"]));
            user.parent.save(user.auth.uid)
                .then(() => console.log("success"))
                .catch((err) => console.log(err));
        }
    }

    return (
        <>
        { JSON.stringify(auth) }
        { JSON.stringify(user) }
        <Text label="Email" id="email" placeholder="Email" value={email} onChange={handleChange}/>
        <Text label="Password" id="password" placeholder="Password" value={password} onChange={handleChange}/>
        <Button theme="default" size="md" onClick={handleSignIn} >
            Sign In
        </Button>
        <Button theme="default" size="md" onClick={() => signout()}>
            Sign Out
        </Button>
        <Button theme="default" size="md" onClick={addMentee}>
            Add Student
        </Button>
        <Button theme="default" size="md" onClick={handleSignUp}>
            Add Mentor
        </Button>

        </>
    )
}

export default SignInPage
