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
import "./index.css"

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

// TODO: Learn how to create test + create test for this component

const Signin = () => {
    const { signin } = useAuth();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        remember: false,
        showPassword: false,
        error: false,
        errorText: ''
    });

    const handleChange = (prop) => (event) => {
        if (prop === 'remember') {
            setValues({ ...values, [prop]: !values.remember });
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

    return (
        <AuthWrapper>
            <AuthInner>
                <form>
                    <h1>Sign In</h1>

                    <div className="form-group">
                        <Text
                            autoFocus = {true}
                            id = 'email'
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
                    {/* TODO: add to styled components */}
                    <style type="text/css">
                        {`
                            .btn-coved {
                              background-color: #00568C;
                              color: white;
                            }
                        `}
                    </style>
                    <br />
                    <Button theme="default" size="md"
                            onClick={async () => {
                                try {
                                    signin(values.email, values.password)
                                } catch (error) {
                                    console.log(error);
                                    setValues({ ...values, errorText: error });
                                    setValues({ ...values, error: true });
                                }
                            }}
                    >
                        Sign In
                    </Button>
                    <p className="forgot-password text-right">
                        Forgot <a href="/forgot-password">password?</a>
                    </p>
                </form>
            </AuthInner>
        </AuthWrapper>
    );
}

export default Signin;
