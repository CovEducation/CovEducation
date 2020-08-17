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

const AuthInner = styled.div`
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    padding: 40px 55px 45px 55px;
    border-radius: 10px;
    transition: all .3s;
`
const AuthWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    .form-control:focus {
        border-color: #00568C;
        box-shadow: none;
    }
    h3 {
        text-align: center;
        margin: 0;
        line-height: 1;
        padding-bottom: 20px;
    }
`
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

const Signin = () => {
    const { signin } = useAuth();

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [submittedOnce, setSubmittedOnce] = useState(false);

    useEffect(() => {
        const invalid = !(email.length > 0 && email.includes('@') && email.includes('.') && password.length > 5);
        setError(invalid);
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
        } else if (prop === 'error') {
            setError(!error);
        }
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const ShowNotifications = () => {
        if (error) {
            return (
                <Notification>
                    <span>
                      <b>Oh snap! -</b>
                      The email and/or password are in the wrong format. Please try again.
                    </span>
                </Notification>
            )
        }
        if (serverError) {
            return (
                <Notification>
                    <span>
                      <b>Oh snap! -</b>
                      The authentication failed.
                    </span>
                </Notification>
            )
        }
        return null;
    }

    return (
        <AuthWrapper>
            <AuthInner>
                <form>
                    <Title>Sign In</Title>

                    <div className="form-group">
                        <Text
                            autoFocus
                            id = 'email'
                            placeholder = "Email"
                            value = {email}
                            onChange = {handleChange('email')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Text
                            id = "password"
                            placeholder = "Password"
                            type = {showPassword ? 'text' : 'password'}
                            value = {password}
                            onChange = {handleChange('password')}
                            required
                            endAdornment = {{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <FormControlLabel
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
                    <br />

                    <Button theme="default" size="md" type="button" theme="accent"
                        onClick={ () => {
                            setSubmittedOnce(true);
                            if (error === false) {
                                signin(email, password).catch(() => {
                                    setServerError(true);
                                });
                            }
                            if (error === false && serverError === false) {
                                console.log('accept sign-in');
                                // redirect to dashboard page
                            }
                        }}
                    >
                        Login
                    </Button>
                    <br />
                    { submittedOnce && <ShowNotifications /> }
                    <PassForget>
                        Forgot <a href="/forgot-password">password?</a>
                    </PassForget>
                </form>
            </AuthInner>
        </AuthWrapper>
    );
}

export default Signin;
