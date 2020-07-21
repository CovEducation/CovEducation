import React, { useState } from 'react';
import styled from 'styled-components';
import Wizard from '../../../../components/Wizard';
import { subjects } from '../../../../constants.js';

import FirstPageForm from './forms/FirstPageForm.js';
import SecondPageForm from './forms/SecondPageForm.js';
import ThirdPageForm from './forms/ThirdPageForm.js';
import FourthPageForm from './forms/FourthPageForm.js';

const SignUpChildWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    max-width: calc(700px - 4em);
    min-width: calc(400px - 4em);
    padding: 2em;
    color: black;
`;

let signUpData = {
    preferredGradeLevel: subjects[0].value,
};

const updateSignUpData = (data) => {
    signUpData = { ...signUpData, ...data };
}

const MentorWizard = () => {

    const FirstPage = () => {

        const [state, setState] = useState({});

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateSignUpData({ [event.target.name]: event.target.value });
        };

        return (
            <SignUpChildWrapper>
                <FirstPageForm data={signUpData} handleChange={handleChange} />
            </SignUpChildWrapper>
        );
    }

    const SecondPage = () => {

        const [state, setState] = useState({});

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateSignUpData({ ...state, [event.target.name]: event.target.value });
        }

        return (
            <SignUpChildWrapper>
                <SecondPageForm data={signUpData} handleChange={handleChange} />
            </SignUpChildWrapper>
        );
    }

    const ThirdPage = () => {

        const [state, setState] = useState({
            selectedSubjects: signUpData.selectedSubjects ?? [],
        });

        const { selectedSubjects } = state;

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateSignUpData({ [event.target.name]: event.target.value });
        };

        return (
            <SignUpChildWrapper>
                <ThirdPageForm data={signUpData} handleChange={handleChange} selectedSubjects={selectedSubjects} />
            </SignUpChildWrapper>
        );
    }

    const FourthPage = () => {

        const [state, setState] = useState({});

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
            updateSignUpData({ [event.target.name]: event.target.checked });
        };

        return (
            <SignUpChildWrapper>
                <FourthPageForm data={signUpData} handleChange={handleChange} />
            </SignUpChildWrapper>
        );
    }

    const children = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />];
    return <Wizard content={children} />;
}

export default MentorWizard;