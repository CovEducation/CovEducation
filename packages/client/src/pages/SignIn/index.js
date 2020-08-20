import React, { useState } from 'react';
import Text from '../../components/TextBox';
import Button from '../../components/Button';
import useAuth from '../../providers/AuthProvider'

const SignInPage = () => {
    const { auth, user, signin, signout, signup } = useAuth();
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

    const createParent = async (event) => {
        signout();

        const parent = {
            name: 'Jimin',
            email: 'chimmy@bts.com',
            phone: '123-456-7890',
            pronouns: 'he/him',
            avatar: 'you-got-no-jams.jpeg',
            timezone: 'not CST :(',
        };

        const students = [
            {
                name: 'Sanjay Yepuri',
                email: 'sclegit@lol.com',
                gradeLevel: '1st Grade',
                subjects: ['Underwater basket weaving', 'How to be a better kpop idol than your parent']
            },{
                name: 'Helen Zhou',
                email: 'xHels@lol.com',
                gradeLevel: '1.5th Grade',
                subjects: ['Being better than Sanjay']
            }
        ];

        parent.role = 'PARENT';
        parent.students = students;

        signup('chimmy@bts.com', 'abc123', parent);
    }

    return (
        <>
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
            <Button theme="accent" size="md" onClick={() => createParent()}>
                Create Parent
            </Button>
        </>
    )
}

export default SignInPage;