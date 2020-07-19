import React, { useState } from 'react';
import styled from 'styled-components';
import Wizard from '../../../../components/Wizard';
import Button from '../../../../components/Button';

import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

import { timeZones, tags, subjects } from '../../../../constants.js';

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

let signUpData = {
    timeZone: timeZones[0].timezone,
    gradeLevel: tags[0].label,
    selectedSubjects: [],
};
const updateSignUpData = (data) => {
    signUpData = { ...signUpData, ...data };
}

const ParentWizard = () => {

    const FirstPage = () => {

        const [state, setState] = useState({});
        
        const timeZoneMenuItems = timeZones.map(item => {
            return <MenuItem key={item.value} value={item.timezone}>{item.timezone}</MenuItem>;
        });

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
                        label="Parent Name"
                        name="parentName"
                        onChange={handleChange}
                        value={signUpData.parentName}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Parent Email" 
                        name="parentEmail"
                        onChange={handleChange}
                        value={signUpData.parentEmail}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Parent Phone Number" 
                        name="parentPhoneNumber"
                        onChange={handleChange}
                        value={signUpData.parentPhoneNumber}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <InputLabel id="wizard-time-zone" required>Time Zone</InputLabel>
                    <Select
                        children={timeZoneMenuItems}
                        displayEmpty
                        fullWidth
                        labelId="wizard-preferred-subjects"
                        name="timeZone"
                        onChange={handleChange}
                        value={signUpData.timeZone}
                        required
                    />
                </WizardInput>
            </SignUpChildWrapper>
        );
    }

    const SecondPage = () => {

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
            updateSignUpData({ ...state, [event.target.name]: event.target.value });
        } 

        return (
            <SignUpChildWrapper>
                {JSON.stringify(signUpData)}
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Student Name"
                        name="studentName"
                        onChange={handleChange}
                        value={signUpData.studentName}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Student Email"
                        name="studentEmail"
                        onChange={handleChange}
                        value={signUpData.studentEmail}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <InputLabel id="wizard-time-zone" required>Grade Level</InputLabel>
                    <Select
                        children={gradeLevelMenuItems}
                        fullWidth
                        labelId="wizard-student-grade-level"
                        name="gradeLevel"
                        onChange={handleChange}
                        value={signUpData.gradeLevel}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <InputLabel id="wizard-time-zone" required>Student Seeking Assistance In</InputLabel>
                    <Select
                        children={subjectsMenuItems}
                        fullWidth
                        multiple
                        name='selectedSubjects'
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(', ')}
                        value={signUpData.selectedSubjects}
                        required
                    />
                </WizardInput>
            </SignUpChildWrapper>
        );
    }

    const ThirdPage = () => {

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
                    <TextField
                        fullWidth
                        label="Password"
                        name="password1"
                        onChange={handleChange}
                        type="password"
                        value={signUpData.password1}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="password2"
                        onChange={handleChange}
                        type="password"
                        value={signUpData.password2}
                        required
                    />
                </WizardInput>
            </SignUpChildWrapper>
        );
    }

    const FourthPage = () => {

        const [state, setState] = useState({});

        const handleCheck = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
            updateSignUpData({ [event.target.name]: event.target.checked });
        };
        
        return (
            <SignUpChildWrapper>
                {JSON.stringify(signUpData)}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={signUpData.agreedTermsOfService}
                            name="agreedTermsOfService"
                            onChange={handleCheck}
                        />
                    }
                    label="I agree to the CovEd Terms of Service." />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={signUpData.agreedPrivacyPolicy}
                            name="agreedPrivacyPolicy"
                            onChange={handleCheck}
                        />
                    }
                    label="I agree to the CovEd Privacy Policy." />
                <Button children={<div>Sign Up</div>} theme="accent" />
            </SignUpChildWrapper>
        );
    }

    const children = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />];
    
    return <Wizard content={children} />;
}

export default ParentWizard;