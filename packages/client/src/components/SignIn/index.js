import React  from 'react';
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

const Signin = () => {
    const { signin } = useAuth();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        remember: false,
        showPassword: false,
        emailError: false,
        passwordError: false,
        error: false,
        serverError: false,
    });

    const handleChange = (prop) => (event) => {
        if (prop === 'remember') {
            setValues({ ...values, [prop]: !values.remember });
        } else if (prop === 'emailError') {
            setValues({ ...values, [prop]: !values.emailError });
        } else if (prop === 'passwordError') {
            setValues({ ...values, [prop]: !values.passwordError });
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const checkValidation = () => {
        if (!(values.email.includes('@') && values.email.includes('.') && values.email.length > 0)) {
            setValues({ ...values, emailError: true });
            setValues({ ...values, serverError: true });
        }
        if (!(values.password.length > 5)) {
            setValues({...values, passwordError: true });
            setValues({ ...values, emailError: true });
        }
        return values.emailError === false && values.passwordError === false;
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
                            border = {values.emailError ? 'red' : 'blue'}
                            placeholder = "Email"
                            value = {values.email}
                            onChange = {handleChange('email')}
                            required = {true}
                        />
                    </div>
                    <div className="form-group">
                        <Text
                            id = "password"
                            placeholder = "Password"
                            type = {values.showPassword ? 'text' : 'password'}
                            value = {values.password}
                            onChange = {handleChange('password')}
                            required = {true}
                            endAdornment = {{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
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
                                    value={values.remember}
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
                                if (checkValidation()) {
                                    signin(values.email, values.password).catch(() => {
                                        setValues({...values, error: true});
                                        console.log(values);
                                    });
                                }
                                if (values.emailError === true || values.passwordError === true) {
                                    setValues({...values, serverError: true});
                                }
                                if (values.error === false && values.emailError === false && values.passwordError === false) {
                                    window.location.reload();
                                    console.log("accept");
                                }
                            }}
                    >
                        Sign In
                    </Button>
                    <br />
                    {
                        values.serverError ? <Notification id="sign-in" /> : null
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
