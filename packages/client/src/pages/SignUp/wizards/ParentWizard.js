import React, { useState } from 'react';
import styled from 'styled-components';
import Wizard from '../../../components/Wizard';
import Button from '../../../components/Button';

import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import { timeZones, tags, subjects } from '../../../constants.js';

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


let globalData = {};

const ParentWizard = (props) => {

    const FirstPage = () => {

        const [state, setState] = useState({
            parentName: '',
            parentEmail: '',
            parentPhoneNumber: '',
            timeZone: '',
        });

        const { parentName, parentEmail, parentPhoneNumber, timeZone } = state;
        
        const timeZoneMenuItems = timeZones.map((item, index) => {
            return <MenuItem key={index} value={item.timezone}>{item.timezone}</MenuItem>;
        });

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value })
        }

        return (
            <SignUpChildWrapper>
                <div>
                    {JSON.stringify(state)}
                </div>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Parent Name"
                        name="parentName"
                        onChange={handleChange}
                        value={parentName}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Parent Email" 
                        name="parentEmail"
                        onChange={handleChange}
                        value={parentEmail}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Parent Phone Number" 
                        name="parentPhoneNumber"
                        onChange={handleChange}
                        value={parentPhoneNumber}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <InputLabel id="wizard-time-zone" required>Time Zone</InputLabel>
                    <Select
                        children={timeZoneMenuItems}
                        fullWidth
                        labelId="wizard-preferred-subjects"
                        name="timeZone"
                        onChange={handleChange}
                        value={timeZone}
                        required
                    />
                </WizardInput>
            </SignUpChildWrapper>
        );
    }

    const SecondPage = () => {

        const [state, setState] = useState({
            studentName: '',
            studentEmail: '',
            gradeLevel: '',
            selectedSubjects: [],
        });

        const { studentName, studentEmail, gradeLevel, selectedSubjects } = state;

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

        const selectedSubjectsString = Object.entries(selectedSubjects).map((item, index) => {
            return item[1];
        }).join(', ');

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
        } 

        return (
            <SignUpChildWrapper>
                <div>
                    {studentName}<br />
                    {studentEmail}<br />
                    {gradeLevel}<br />
                    {selectedSubjectsString}
                </div>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Student Name"
                        name="studentName"
                        onChange={handleChange}
                        value={studentName}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Student Email"
                        name="studentEmail"
                        onChange={handleChange}
                        value={studentEmail}
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
                        value={gradeLevel}
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
                        value={selectedSubjects}
                        required
                    />
                </WizardInput>
            </SignUpChildWrapper>
        );
    }

    const ThirdPage = () => {

        const [state, setState] = useState({
            username: '',
            password1: '',
            password1Error: false,
            password2: '',
            password2Error: false,
        });

        const { username, password1, password1Error, password2, password2Error} = state;

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
        };

        return (
            <SignUpChildWrapper>
                <div>
                    {username}<br />
                    {password1}<br />
                    {password2}<br />
                </div>
                <WizardInput>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        onChange={handleChange}
                        value={username}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        error={password1Error}
                        fullWidth
                        label="Password"
                        name="password1"
                        onChange={handleChange}
                        type="password"
                        value={password1}
                        required
                    />
                </WizardInput>
                <WizardInput>
                    <TextField
                        error={password2Error}
                        fullWidth
                        label="Confirm Password"
                        name="password2"
                        onChange={handleChange}
                        type="password"
                        value={password2}
                        required
                    />
                </WizardInput>
            </SignUpChildWrapper>
        );
    }

    const FourthPage = () => {
        
        const [state, setState] = useState({
            agreedTermsOfService: false,
            agreedPrivacyPolicy: false,
        });

        const { agreedTermsOfService, agreedPrivacyPolicy } = state;
        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        }

        return (
            <SignUpChildWrapper>
                <div>
                    {agreedTermsOfService ? 'true' : 'false'}<br />
                    {agreedPrivacyPolicy ? 'true' : 'false'}
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agreedTermsOfService}
                            name="agreedTermsOfService"
                            onChange={handleChange}
                        />
                    }
                    label="I agree to the CovEd Terms of Service." />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agreedPrivacyPolicy}
                            name="agreedPrivacyPolicy"
                            onChange={handleChange}
                        />
                    }
                    label="I agree to the CovEd Privacy Policy." />
                <Button children={<div>Sign Up</div>} theme="accent" />
            </SignUpChildWrapper>
        );
    }

    const children = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />];
    
    return (
        <div>
            <Wizard content={children} />
        </div>
    );
}

export default ParentWizard;