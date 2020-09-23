import React, { useEffect, useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import Text from '../../components/TextBox';
import Checkbox from '@material-ui/core/Checkbox';
import useAuth from '../../providers/AuthProvider'
import Button from '../Button';
import UncontrolledAlert from '../Notification/UncontrolledAlert';
import { FormControl } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';

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

const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email')
            .required('Please enter your email.'),
    password: Yup.string().required('Please enter your password.')
});

const Signin = () => {
    const { signin } = useAuth();
    const [formError, setFormError] = useState(false);
    const [remember, setRemember] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SigninSchema,
        onSubmit: values => console.log(JSON.stringify(values))
    });

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

    return (
        <Container component="form" maxWidth="xs" onSubmit={formik.handleSubmit}>
            <Grid container justify='center'>
                <Grid item xs={12} align='center'>
                    <Title>Sign In</Title>
                </Grid>
                <Text
                    autoFocus
                    id='email'
                    placeholder="Email"
                    error={formik.touched.email && formik.errors.email}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                />
                <Text
                    id="password"
                    placeholder="Password"
                    error={formik.touched.password && formik.errors.password}
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    helperText={formik.touched.password && formik.errors.password}
                    required
                    endAdornment={{
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
                {/* <Grid item xs={12} align='left'>
                    <FormControl>
                        <FormControlLabel
                            style={{
                                paddingLeft: '13px'
                            }}
                            control={
                                <Checkbox
                                    id="remember"
                                    onChange={formik.handleChange}
                                    value={formik.values.remember}
                                    name="remember"
                                    color="primary"
                                />
                            }
                            label="Remember Me"
                        />
                    </FormControl>
                </Grid> */}
                <Grid item xs={12} align='center'>
                    <Button
                        type="submit"
                        theme="default"
                        size="md"
                        >
                        Login
                    </Button>
                </Grid>
                <Grid item xs={12} align='right'>
                    <a href="/forgot-password">Forgot password?</a>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Signin;