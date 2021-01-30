import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Text from '../../components/TextBox';
import useAuth from '../../providers/AuthProvider';
import Button from '../Button';
import UncontrolledAlert from '../Notification/UncontrolledAlert';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";

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
const Title = styled.h1`
    text-align: center;
`

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email')
        .required('Please enter your email.'),
    password: Yup.string().required('Please enter your password.')
});

const Signin = (props) => {
    const history = useHistory();
    const { signin } = useAuth();
    const [serverError, setServerError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [submittedOnce, setSubmittedOnce] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = ({ email, password }) => {
        setSubmittedOnce(true);
        signin(email, password)
            .then(() => history.push('/dashboard/profile'))
            .catch(() => setServerError(true));
    }


    const ShowNotifications = () => {
        if (serverError) {
            return (
                <Notification>
                    <span>
                        Incorrect email/password.
                    </span>
                </Notification>
            )
        } else {
            return <> </>
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SigninSchema,
        onSubmit: handleSubmit
    });


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
                <Grid item xs={12} align='center'>
                    <Button
                        type="submit"
                        theme="default"
                        size="md"
                    >
                        Login
                    </Button>
                </Grid>
                {submittedOnce && <ShowNotifications />}

                <Grid item xs={12} align='right'>
                    <a href="/forgot-password">Forgot password?</a>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Signin;