import React from 'react';
import { Formik } from 'formik';
import Form from './form';
import * as Yup from 'yup';

const signInValidation = Yup.object({
    email: Yup.string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup.string('')
        .min(8, 'Password must contain at least 8 characters')
        .required('Enter your password'),
})

// implements Yup
const Signin = () => {
    return (
        <Formik
            initialValues={''}
            onSubmit={console.log('checking...')}
            // not sure how to extract the
            // errors into the alert below
            validationSchema={signInValidation}
        >
            {
                (props) => <Form {...props} />
            }
        </Formik>
    );
}

export default Signin;