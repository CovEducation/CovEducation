import React from 'react';
import styled from 'styled-components';
import SignIn from '../../components/SignIn';

const SignInPageWrapper = styled.div`
    display: flex;
    min-height: 75vh;
    padding-top: 3em;
`;

const SignInPage = () => {
    return (
        <SignInPageWrapper>
            <SignIn />
        </SignInPageWrapper>
    );
}

export default SignInPage;