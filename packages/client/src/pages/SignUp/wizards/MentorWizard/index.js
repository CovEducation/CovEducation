import React, { useState } from 'react';
import styled from 'styled-components';
import Wizard from '../../../../components/Wizard';
import Button from '../../../../components/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { timeZones, subjects, tags } from '../../../../constants.js';

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

const WizardInput = styled.div`
    margin-bottom: 1em;
    min-width: 120px;
`;

const SELECT_ITEM_HEIGHT = 48;
const SELECT_ITEM_PADDING_TOP = 8;
const SelectMenuProps = {
    PaperProps: {
        style: {
            maxHeight: SELECT_ITEM_HEIGHT * 4.5 + SELECT_ITEM_PADDING_TOP,
        },
    },
};

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
                {JSON.stringify(signUpData)}
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        onChange={handleChange}
                        value={signUpData.username}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField fullWidth
                        label="Password"
                        name="password1"
                        onChange={handleChange}
                        value={signUpData.password1}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField fullWidth
                        label="Confirm Password"
                        name="password2"
                        onChange={handleChange}
                        value={signUpData.password2}
                        required
                    />
                </WizardInput>
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
                {JSON.stringify(signUpData)}
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Major"
                        name="major"
                        onChange={handleChange}
                        value={signUpData.major}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Introduce Yourself"
                        multiline
                        name="introduction"
                        onChange={handleChange}
                        rows={4}
                        value={signUpData.introduction}
                        required
                    />
                </WizardInput>
            </SignUpChildWrapper>
        );
    }

    const ThirdPage = () => {

        const [state, setState] = useState({
            selectedSubjects: signUpData.selectedSubjects ?? [],
        });

        const { selectedSubjects } = state;

        const gradeLevelMenuItems = tags.map((item, index) => (
            <MenuItem
                children={item.label}
                key={index}
                value={item.value}
            />
        ));

        const subjectsMenuItems = subjects.map((item, index) => (
            <MenuItem
                key={index}
                value={item.value}
            >
                <Checkbox value={item.value} checked={selectedSubjects.indexOf(item.value) > -1} />
                {item.label}
            </MenuItem>
        ));

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateSignUpData({ [event.target.name]: event.target.value });
        };

        return (
            <SignUpChildWrapper>
                {JSON.stringify(signUpData)}
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Name"
                        name="mentorName"
                        onChange={handleChange}
                        value={signUpData.mentorName}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Email"
                        name="mentorEmail"
                        onChange={handleChange}
                        value={signUpData.mentorEmail}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <InputLabel id="wizard-preferred-grade-level">Preferred Grade Level</InputLabel>
                    <Select
                        children={gradeLevelMenuItems}
                        displayEmpty
                        fullWidth
                        labelId="wizard-preferred-grade-level"
                        MenuProps={SelectMenuProps}
                        name="preferredGradeLevel"
                        onChange={handleChange}
                        value={signUpData.preferredGradeLevel}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <InputLabel id="wizard-preferred-subjects">Preferred Subjects</InputLabel>
                    <Select
                        children={subjectsMenuItems}
                        displayEmpty
                        fullWidth
                        labelId="wizard-preferred-subjects"
                        MenuProps={SelectMenuProps}
                        name="preferredSubjects"
                        onChange={handleChange}
                        value={signUpData.preferredSubjects}
                        required
                    />
                </WizardInput>
            </SignUpChildWrapper>
        );
    }

    const FourthPage = () => {

        const [state, setState] = useState({});

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
            updateSignUpData({ [event.target.name]: event.target.checked });
        };

        const termsOfServiceCheckbox = (
            <Checkbox
                checked={signUpData.termsOfService}
                name="termsOfService"
                onChange={handleChange} />
        );

        const termsOfServiceControl = (
            <FormControlLabel
                control={termsOfServiceCheckbox}
                label="I agree to the CovEd Terms of Service."
                required
            />
        );

        const privacyPolicyCheckbox = (
            <Checkbox
                checked={signUpData.privacyPolicy}
                name="privacyPolicy"
                onChange={handleChange} />
        );
        const privacyPolicyControl = (
            <FormControlLabel
                control={privacyPolicyCheckbox}
                fullWidth
                label="I agree to the CovEd Privacy Policy."
                required
            />
        );

        const isDisabled = !(signUpData.termsOfService && signUpData.privacyPolicy);
        return (
            <SignUpChildWrapper>
                {JSON.stringify(signUpData)}
                <FormGroup>
                    {termsOfServiceControl}
                    {privacyPolicyControl}
                    <Button
                        disabled={isDisabled}
                        children={<div>Submit</div>}
                    />
                </FormGroup>
            </SignUpChildWrapper>
        );
    }

    const children = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />];
    return <Wizard content={children} />;
}

export default MentorWizard;