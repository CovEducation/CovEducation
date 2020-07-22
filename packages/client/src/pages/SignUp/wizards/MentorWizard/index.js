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

let mentorWizardSignUpData = {
    // Page 1
    username: undefined,
    password1: undefined,
    password2: undefined,

    // Page 2
    major: undefined,
    introduction: undefined,

    //Page 3
    mentorName: undefined,
    mentorEmail: undefined,
    selectedGradeLevels: [],
    selectedSubjects: [],

    //Page 4
    agreeTermsOfServce: undefined,
    agreePrivacyPolicy: undefined,
};


const updateMentorWizardSignUpData = (data) => {
    mentorWizardSignUpData = { ...mentorWizardSignUpData, ...data };
}

const MentorWizard = () => {

    const FirstPage = () => {

        const [state, setState] = useState({});

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateMentorWizardSignUpData({ [event.target.name]: event.target.value });
        };

        return (
            <SignUpChildWrapper>
                <FirstPageForm data={mentorWizardSignUpData} handleChange={handleChange} />
            </SignUpChildWrapper>
        );
    }

    const SecondPage = () => {

        const [state, setState] = useState({});

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateMentorWizardSignUpData({ ...state, [event.target.name]: event.target.value });
        }

        return (
            <SignUpChildWrapper>
                <SecondPageForm data={mentorWizardSignUpData} handleChange={handleChange} />
            </SignUpChildWrapper>
        );
    }

    const ThirdPage = () => {

        const [state, setState] = useState({
            selectedGradeLevels: mentorWizardSignUpData.selectedGradeLevels ?? [],
            selectedSubjects: mentorWizardSignUpData.selectedSubjects ?? [],
        });

        const { selectedGradeLevels, selectedSubjects } = state;

        const handleChange = (event) => {
            console.log("clicked", event.target.name, event.target.value);
            setState({ ...state, [event.target.name]: event.target.value });
            updateMentorWizardSignUpData({ [event.target.name]: event.target.value });
        };

        return (
            <SignUpChildWrapper>
                <ThirdPageForm data={mentorWizardSignUpData} handleChange={handleChange} selectedGradeLevels={selectedGradeLevels} selectedSubjects={selectedSubjects} />
            </SignUpChildWrapper>
        );
    }

    const FourthPage = () => {

        const [state, setState] = useState({});

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
            updateMentorWizardSignUpData({ [event.target.name]: event.target.checked });
        };

        return (
            <SignUpChildWrapper>
                <FourthPageForm data={mentorWizardSignUpData} handleChange={handleChange} />
            </SignUpChildWrapper>
        );
    }

    const children = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />];
    return <Wizard content={children} />;
}

export default MentorWizard;