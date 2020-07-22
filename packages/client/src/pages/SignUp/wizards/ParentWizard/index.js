import React, { useState } from 'react';
import styled from 'styled-components';
import Wizard from '../../../../components/Wizard';
import Button from '../../../../components/Button';

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

const ChildSignUpButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

let parentWizardSignUpData = {
    // Page 1
    username: undefined,
    password1: undefined,
    password2: undefined,

    // Page 2
    registeredChildren: [{
        studentName: undefined,
        studentEmail: undefined,
        gradeLevel: '',
        selectedSubjects: [],
    }],

    //Page 3
    parentName: undefined,
    parentEmail: undefined,
    parentPhoneNumber: undefined,
    timeZone: '',

    //Page 4
    agreeTermsOfServce: undefined,
    agreePrivacyPolicy: undefined,
};

const updateParentWizardSignUpData = (data) => {
    parentWizardSignUpData = { ...parentWizardSignUpData, ...data };
}

const updateRegisteredChild = (index, data) => {
    let childRegistrationInfo = parentWizardSignUpData.registeredChildren[index];
    let mergedChildRegistration = { ...childRegistrationInfo, ...data };
    parentWizardSignUpData.registeredChildren[index] = mergedChildRegistration;
}

const ParentWizard = () => {

    const FirstPage = () => {

        const [state, setState] = useState({});

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateParentWizardSignUpData({ [event.target.name]: event.target.value });
        };

        return (
            <SignUpChildWrapper>
                <FirstPageForm data={parentWizardSignUpData} handleChange={handleChange} />
            </SignUpChildWrapper>
        );
    }

    const SecondPage = () => {

        const [state, setState] = useState({});

        let children = parentWizardSignUpData.registeredChildren.map((item, index) => {
            return <SecondPageForm data={parentWizardSignUpData} index={index} updateRegisteredChild={updateRegisteredChild} />;
        });

        const handleAddClick = (event) => {
            event.preventDefault();
            parentWizardSignUpData.registeredChildren.push({
                selectedSubjects: [],
                gradeLevel: '',
            });
            setState({ ...state });
        }

        const handleRemoveClick = (event) => {
            event.preventDefault();
            parentWizardSignUpData.registeredChildren.pop();
            setState({ ...state });
        }

        const showRemoveChildButton = parentWizardSignUpData.registeredChildren.length > 1;

        return (
            <SignUpChildWrapper>
                {children}
                <ChildSignUpButtonWrapper>
                    <Button onClick={handleAddClick}>
                        Add Child
                    </Button>
                    {showRemoveChildButton ?
                        <Button onClick={handleRemoveClick}>
                            Remove Child
                        </Button> : null}
                </ChildSignUpButtonWrapper>
            </SignUpChildWrapper>
        );
    }

    const ThirdPage = () => {

        const [state, setState] = useState({});

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateParentWizardSignUpData({ [event.target.name]: event.target.value });
        };

        return (
            <SignUpChildWrapper>
                <ThirdPageForm data={parentWizardSignUpData} handleChange={handleChange}/>
            </SignUpChildWrapper>
        );
    }

    const FourthPage = () => {

        const [state, setState] = useState({});

        const handleCheck = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
            updateParentWizardSignUpData({ [event.target.name]: event.target.checked });
        };
        
        return (
            <SignUpChildWrapper>
                <FourthPageForm data={parentWizardSignUpData} handleCheck={handleCheck}/>
            </SignUpChildWrapper>
        );
    }

    const children = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />];
    
    return <Wizard content={children} />;
}

export default ParentWizard;