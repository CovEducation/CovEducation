import React from 'react';
import styled from 'styled-components';
import Wizard from '../../../components/Wizard';
import Button from '../../../components/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { subjects, tags } from '../../../constants.js';

const SignUpChildWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    max-width: 400px;
    min-width: calc(400px - 4em);
    padding: 2em;
    color: black;
`;

const WizardInput = styled.div`
    margin-bottom: 1em;
    min-width: 120px;
`;

const FirstPage = () => {

    const gradeLevelMenuItems = tags.map((item, index) => {
        return <MenuItem key={index} value={item.id}>{item.value}</MenuItem>;
    });

    const subjectMenuItems = subjects.map((item, index) => {
        return <MenuItem key={index} value={item.id}>{item.value}</MenuItem>;
    });

    return (
        <SignUpChildWrapper>
            <WizardInput>
                <TextField fullWidth id="wizard-name" label="Name" />
            </WizardInput>
            <WizardInput>
                <TextField fullWidth id="wizard-email" label="Email" />
            </WizardInput>
            <WizardInput>
                <InputLabel id="wizard-preferred-grade-level">Preferred Grade Level</InputLabel>
                <Select fullWidth value={"0"} style={{ "minWidth": "120px" }} labelId="wizard-preferred-grade-level">
                    {gradeLevelMenuItems}
                </Select>
            </WizardInput>
            <WizardInput>
                <InputLabel id="wizard-preferred-subjects">Preferred Subjects</InputLabel>
                <Select fullWidth value={"0"} labelId="wizard-preferred-subjects">
                    {subjectMenuItems}
                </Select>
            </WizardInput>
        </SignUpChildWrapper>
    );
}

const SecondPage = () => {

    return (
        <SignUpChildWrapper>
            <WizardInput>
                <TextField fullWidth id="wizard-major" label="Major" />
            </WizardInput>
            <WizardInput>
                <TextField
                    id="standard-multiline-static"
                    label="Introduce Yourself"
                    multiline
                    fullWidth
                    rows={4}
                />
            </WizardInput>
        </SignUpChildWrapper>
    );
}

const ThirdPage = () => {
    return (
        <SignUpChildWrapper>
            <WizardInput>
                <TextField fullWidth label="Username" />
            </WizardInput>
            <WizardInput>
                <TextField fullWidth label="Password" />
            </WizardInput>
            <WizardInput>
                <TextField fullWidth label="Confirm Password" />
            </WizardInput>
        </SignUpChildWrapper>
    );
}

const FourthPage = () => {

    const termsOfServiceControl = (
        <FormControlLabel
            control={
                <Checkbox
                    name="terms-of-service"
                />
            }
            label="I agree to the CovEd Terms of Service." />
    );

    const privacyPolicyControl = (
        <FormControlLabel
            control={
                <Checkbox
                    name="privacy-policy"
                />
            }
            label="I agree to the CovEd Privacy Policy." />
    );

    return (
        <SignUpChildWrapper>
            <FormGroup>
                {termsOfServiceControl}
                {privacyPolicyControl}
                <Button children={<div>Submit</div>} theme="accent" />
            </FormGroup>
        </SignUpChildWrapper>
    );
}

const MentorWizard = () => {
    const children = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />];
    return <Wizard content={children} />;
}

export default MentorWizard;