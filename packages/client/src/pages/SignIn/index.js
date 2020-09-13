import React, { useState } from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import SignIn from '../../components/SignIn';

const SignInPageWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
`;

const SignInWizardWrapper = styled.div`
    padding: 1em;
`;

const SignInPage = () => {
    return (
        <SignInPageWrapper>
            <SignInWizardWrapper>
                <SignIn />
            </SignInWizardWrapper>
        </SignInPageWrapper>
    );
}

export default SignInPage;
