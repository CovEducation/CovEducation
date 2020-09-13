import React, { useState } from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import SignIn from '../../components/SignIn';

const SignInPageWrapper = styled.div`
    display: flex;
    min-height: 75vh;
    padding-top: 3em;
`;

const SignInWizardWrapper = styled.div`
    padding: 1em;
`;

const SignInPage = () => {
    return (
        <SignInPageWrapper>
            <SignIn />
        </SignInPageWrapper>
    );
}

export default SignInPage;