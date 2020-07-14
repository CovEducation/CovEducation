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
        <form>
            { JSON.stringify(user) }
            <br/>
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
                    onClick={() => {
                        signin(values.email, values.password)
                    }}
            >
                Sign In
            </Button>
            <p className="forgot-password text-right">
                Forgot <a href="/forgot-password">password?</a>
            </p>
        </form>
    );
}

export default Signin;
