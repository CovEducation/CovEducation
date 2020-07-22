import React, { useState }  from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Text from '../../components/TextBox';
import Checkbox from '@material-ui/core/Checkbox';
import useAuth from '../../providers/AuthProvider'
import Button from '../Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import styled from 'styled-components';
import Notification from '../Notification'

const AuthInner = styled.div`
    width: 450px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
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

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};


const Signin = () => {
    const { signin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let error = false;
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [remember, setRemember] = useState(false);

    const handleChange = (prop) => {
        if (prop === 'remember') {
            setRemember(!remember);
        } else if (prop === 'emailError') {
            setEmailError(!emailError);
        } else if (prop === 'passwordError') {
            setPasswordError(!passwordError);
        } else if (prop === 'serverError') {
            setServerError(!serverError);
        } else if (prop === 'email') {
            setEmail(!email);
        } else if (prop === 'password') {
            setPassword(!password);
        } else if (prop === 'error') {
            error = !error;
        }
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // TODO: fix validation
    const checkValidation = () => {
        if (email.length > 0 && password.length > 0) {
            if (email.includes('@') && email.includes('.')) {
                setEmailError(false);
            } else {
                setEmailError(true);
                error = true;
            }
            if (password.length > 5) {
                setPasswordError(false);
            } else {
                setPasswordError(false);
                error = true;
            }
        } else {
            error = true;
        }
        if (serverError === true) {
            error = true;
        }
    }

    return (
        <AuthWrapper>
            <AuthInner>
                <form>
                    <h1>Sign In</h1>
                    <div className="form-group">
                        <Text
                            autoFocus = {true}
                            id = 'email'
                            border = {emailError ? 'red' : 'blue'}
                            placeholder = "Email"
                            value = {email}
                            onChange = {handleChange('email')}
                            required = {true}
                        />
                    </div>
                    <div className="form-group">
                        <Text
                            id = "password"
                            placeholder = "Password"
                            type = {showPassword ? 'text' : 'password'}
                            value = {password}
                            onChange = {() => handleChange('password')}
                            required = {true}
                            endAdornment = {{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleClickShowPassword}
                                            onMouseDown={() => handleMouseDownPassword}
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
                                    onChange={() => handleChange('remember')}
                                    value={remember}
                                    name="remember"
                                    color="primary"
                                />
                            }
                            label="Remember Me"
                        />
                    </div>
                    <br />
                    <Button theme="default" size="md" type="button"
                            onClick={ () => {
                                checkValidation();
                                if (emailError === false && passwordError === false) {
                                    signin(email, password).catch(() => {
                                        error = true;
                                        setServerError(true);
                                    });
                                } else {
                                    error = true;
                                }
                                if (error === false && emailError === false && passwordError === false && serverError === false) {
                                    window.location.reload();
                                    console.log('accept');
                                }
                                console.log(error);
                            }}
                    >
                        Sign In
                    </Button>
                    <br />
                    {
                        error ? <Notification id="sign-in" /> : null
                    }
                    <PassForget>
                        Forgot <a href="/forgot-password">password?</a>
                    </PassForget>
                </form>
            </AuthInner>
        </AuthWrapper>
    );
}

export default Signin;
