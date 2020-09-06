import React, { useEffect, useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Text from '../../components/TextBox';
import Checkbox from '@material-ui/core/Checkbox';
import useAuth from '../../providers/AuthProvider'
import Button from '../Button';
import UncontrolledAlert from '../Notification/UncontrolledAlert';

const Notification = styled(UncontrolledAlert)`
    .section {
        padding: 70px 0;
        position: relative;
    }
    .close {
        float: right;
        top: 1px;
    }

    position: relative;
    padding: 0.9rem 1.25rem;
    margin-bottom: 1rem;
    width: 33ch;
    border: 0.0625rem solid transparent;
    border-radius: 0.2857rem; }
    color: #ffffff;
    background-color: rgba(255, 14, 14, 0.51);
`
const PassForget = styled.p`
    text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: #7f7d7d;
    margin: 0;

    a {
        color: #00568C;
    }
`
const Title = styled.h1`
    text-align: center;
`

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

const validateUserFields = (email, password) => {
    const longEnough = email.length > 0 && password.length > 5;
    const validEmail = email.includes('@') && email.includes('.');
    return validEmail && longEnough;
}

const Signin = () => {
    const { signin } = useAuth();
    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState(false);
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [submittedOnce, setSubmittedOnce] = useState(false);

    useEffect(() => {
        const valid = validateUserFields(email, password);
        setFormError(!valid);
    }, [email, password]);

    const handleChange = (prop) => (event) => {
        if (prop === 'email') {
            setEmail(event.target.value);
        } else if (prop === 'password') {
            setPassword(event.target.value);
        } else if (prop === 'serverError') {
            setServerError(!serverError);
        } else if (prop === 'remember') {
            setRemember(!remember);
        } else if (prop === 'formError') {
            setFormError(!formError);
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    
    
    const ShowNotifications = () => {
        if (!formError && !serverError) return <></>;

        if (formError) {
            return (
                <Notification>
                    <span>
                      The email and/or password are in the wrong format. Please try again.
                    </span>
                </Notification>
            )
        }
        if (serverError) {
            return (
                <Notification>
                    <span>
                      Wrong email and password.
                    </span>
                </Notification>
            )
        }
    }

    const handleSubmit = () => {
        setSubmittedOnce(true);
        // We don't have to return anything since the
        // Notification component will alert the user.
        if (formError || serverError) return;
        signin(email, password)
            .then(() => console.log('Signed in!'))
            .catch(() => setServerError(true));
    }
    
    return (
        <form>
            <Title>Sign In</Title>
            <table>
                <tr>
                    <td align="center">
                        <div className="form-group">
                            <Text
                                autoFocus
                                id='email'
                                placeholder="Email"
                                value={email}
                                onChange={handleChange('email')}
                                required
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <div className="form-group">
                            <Text
                                id="password"
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handleChange('password')}
                                required
                                endAdornment={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="form-group">
                            <FormControlLabel
                                style={{
                                    paddingLeft: '13px'
                                }}
                                control={
                                    <Checkbox
                                        id="checkbox"
                                        onChange={handleChange('remember')}
                                        value={remember}
                                        name="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember Me"
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <br/>
                        <Button 
                            theme="default" 
                            size="md" 
                            type="button"
                            onClick={handleSubmit}>
                            Login
                        </Button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br/>
                        {submittedOnce && <ShowNotifications/>}
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <PassForget>
                            <a href="/forgot-password">Forgot password?</a>
                        </PassForget>
                    </td>
                </tr>
            </table>
            <br/>
        </form>
    );
}

export default Signin;