import React, { useState } from 'react';
import styled from 'styled-components';
import Wizard from '../../../../components/Wizard';
import Button from '../../../../components/Button';

import ParentStep1 from './forms/ParentStep1.js';
import ParentStep2 from './forms/ParentStep2.js';
import ParentStep3 from './forms/ParentStep3.js';
import ParentStep4 from './forms/ParentStep4.js';

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

    //Page 2
    parentName: undefined,
    parentEmail: undefined,
    parentPhoneNumber: undefined,
    timeZone: '',

    // Page 3
    registeredChildren: [{
        studentName: undefined,
        studentEmail: undefined,
        seletedGradeLevel: '',
        selectedSubjects: [],
    }],

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

const FirstPage = () => {

    const [state, setState] = useState({});

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        updateParentWizardSignUpData({ [event.target.name]: event.target.value });
    };

    return (
        <SignUpChildWrapper>
            <ParentStep1 data={parentWizardSignUpData} handleChange={handleChange} />
        </SignUpChildWrapper>
    );
}

const SecondPage = () => {

    const [state, setState] = useState({});

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        updateParentWizardSignUpData({ [event.target.name]: event.target.value });
    };

    return (
        <SignUpChildWrapper>
            <ParentStep2 data={parentWizardSignUpData} handleChange={handleChange} />
        </SignUpChildWrapper>
    );
}

const ThirdPage = () => {

    const [state, setState] = useState({});

    let children = parentWizardSignUpData.registeredChildren.map((item, index) => {
        return <ParentStep3 key={index} index={index} data={parentWizardSignUpData} updateRegisteredChild={updateRegisteredChild} />;
    });

    const handleAddClick = (event) => {
        event.preventDefault();
        parentWizardSignUpData.registeredChildren.push({
            selectedSubjects: [],
            seletedGradeLevel: '',
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

const FourthPage = () => {

    const [state, setState] = useState({});

    const handleCheck = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        updateParentWizardSignUpData({ [event.target.name]: event.target.checked });
    };

    return (
        <SignUpChildWrapper>
            <ParentStep4 data={parentWizardSignUpData} handleCheck={handleCheck} />
        </SignUpChildWrapper>
    );
}

const ParentWizard = () => {
    const children = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />];    
    return <Wizard content={children} />;
}

export default ParentWizard;