import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Text from '../../components/TextBox';
import Checkbox from '@material-ui/core/Checkbox';
import useAuth from '../../providers/AuthProvider'
import Button from '../Button';

// TODO: Learn how to create test + create test for this component

const Signin = () => {
    const { signin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }
    return (

        <form>
            <h3>Sign In</h3>

            <div className="form-group">
                <Text label="Email" id="email" placeholder="Email" value={email} onChange={handleChange}/>
            </div>

            <div className="form-group">
                <Text label="Password" id="password" placeholder="Password" value={password} onChange={handleChange}/>
            </div>

            <div className="form-group">
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleChange}
                            name="remember"
                            color="primary"
                        />
                    }
                    label="Remember Me"
                />
            </div>
            <style type="text/css">
                {`
                    .btn-coved {
                      background-color: #00568C;
                      color: white;
                    }
                `}
            </style>
            <Button theme="default" size="md" onClick={() => signin(email, password)}>
                Sign In
            </Button>
            <p className="forgot-password text-right">
                Forgot <a href="https://#">password?</a>
            </p>
        </form>
    );
}

export default Signin;