import React  from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Text from '../../components/TextBox';
import Checkbox from '@material-ui/core/Checkbox';
import useAuth from '../../providers/AuthProvider'
import Button from '../Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// TODO: Learn how to create test + create test for this component

const Signin = () => {
    const { user, signin } = useAuth();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        remember: false,
        showPassword: false,
        errorText: ''
    });

    const handleChange = (prop) => (event) => {

        if (prop === 'email') {
            if ((values.email.includes('@') && values.email.includes('.co')) || values.email.length === 0)  {
                setValues({ ...values, email: event.target.value });
                setValues({ ...values, errorText: "" });
            } else {
                setValues({ ...values, email: event.target.value });
                setValues({ ...values, errorText: "Please use a valid email address." });
            }
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
        <form>
            <br />
            { JSON.stringify(user) }
            <br />
            <h3>Sign In</h3>

            <div className="form-group">
                <Text
                    autoFocus = {true}
                    id = 'email'
                    placeholder = "Email"
                    value = {values.email}
                    onChange = {handleChange('email')}
                    helperText = {values.errorText}
                    error = {false}
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
                            onChange={handleChange('remember')}
                            value={values.remember}
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
            <Button theme="default" size="md" onClick={() => signin(values.email, values.password)}>
                Sign In
            </Button>
            <p className="forgot-password text-right">
                Forgot <a href="https://#">password?</a>
            </p>
        </form>
    );
}

export default Signin;
