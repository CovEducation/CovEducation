import React, { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../../../../providers/AuthProvider';
import Stepper from '../../../../components/Stepper';

import MentorStep1 from './forms/MentorStep1.js';
import MentorStep2 from './forms/MentorStep2.js';
import MentorStep3 from './forms/MentorStep3.js';
import MentorStep4 from './forms/MentorStep4.js';

import { createMentorModel } from '../../../../models';


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

    //Page 2
    mentorName: undefined,
    mentorEmail: undefined,
    selectedGradeLevels: [],
    selectedSubjects: [],

    // Page 3
    major: undefined,
    introduction: undefined,

    //Page 4
    agreeTermsOfServce: undefined,
    agreePrivacyPolicy: undefined,
};

const updateMentorWizardSignUpData = (data) => {
    mentorWizardSignUpData = { ...mentorWizardSignUpData, ...data };
}

const FirstPage = () => {
    const [state, setState] = useState({});

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        updateMentorWizardSignUpData({ [event.target.name]: event.target.value });
    };

    return (
        <SignUpChildWrapper>
            <MentorStep1 data={mentorWizardSignUpData} handleChange={handleChange} />
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
            <MentorStep2 data={mentorWizardSignUpData} handleChange={handleChange} />
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
            <MentorStep3 data={mentorWizardSignUpData} handleChange={handleChange} selectedGradeLevels={selectedGradeLevels} selectedSubjects={selectedSubjects} />
        </SignUpChildWrapper>
    );
}

const FourthPage = () => {

    const [state, setState] = useState({});
    const { signup } = useAuth();

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        updateMentorWizardSignUpData({ [event.target.name]: event.target.checked });
    };

    return (
        <SignUpChildWrapper>
            <MentorStep4
                data={mentorWizardSignUpData}
                handleChange={handleChange}
                onClick={ async () => {
                    await signup(
                        mentorWizardSignUpData.mentorEmail,
                        mentorWizardSignUpData.password1,
                        createMentorModel(mentorWizardSignUpData)
                    )
                    alert('Signed in! Redirecting to dashboard...');
                }}
                />
        </SignUpChildWrapper>
    );
}

const MentorWizard = () => {

    const children = [
        {
            title: "Login Information",
            form: <FirstPage />
        },
        {
            title: "Mentor Information",
            form: <SecondPage />
        },
        {
            title: "Mentor Bio",
            form: <ThirdPage />
        },
        {
            title: "Terms of Service & Privacy Policy",
            form: <FourthPage />
        }
    ];

    const handleSubmit = () => {
        console.log(JSON.stringify(mentorWizardSignUpData));
    };

    return <Stepper steps={children} handleSubmit={handleSubmit} />;
}

export default MentorWizard;
