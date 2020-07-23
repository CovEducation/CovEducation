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
const Title = styled.h1`
    text-align: center;
`

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

const Signin = () => {
    const [counter, setCounter] = useState(0);
    const { signin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let error = false;
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [remember, setRemember] = useState(false);

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
            error = !error;
        }
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const checkValidation = () => {
        error = !(email.length > 0 && email.includes('@') && email.includes('.') && password.length > 5);
    }

    const ShowNotifications = () => {
        if (counter > 0) {
            checkValidation();
        }
        if (error) {
            return (
                <Notification id="sign-in" />
            )
        }
        if (serverError) {
            return (
                <Notification id="auth" />
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
                            autoFocus = {true}
                            id = 'email'
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
                            onChange = {handleChange('password')}
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

                    <Button theme="default" size="md" type="button"
                            onClick={ () => {
                                checkValidation();
                                setCounter(counter + 1);
                                console.log(error);
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
                        Sign In
                    </Button>
                    <br />
                    <ShowNotifications counter={counter}/>
                    <PassForget>
                        Forgot <a href="/forgot-password">password?</a>
                    </PassForget>
                </form>
            </AuthInner>
        </AuthWrapper>
    );
}

export default Signin;
