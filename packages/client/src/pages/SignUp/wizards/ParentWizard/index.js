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

let signUpData = {
    timeZone: '',
    registeredChildren: [{
        selectedSubjects: [],
        gradeLevel: '',
    }],
};

const updateSignUpData = (data) => {
    signUpData = { ...signUpData, ...data };
}

const updateRegisteredChild = (index, data) => {
    let childRegistrationInfo = signUpData.registeredChildren[index];
    let mergedChildRegistration = { ...childRegistrationInfo, ...data };
    signUpData.registeredChildren[index] = mergedChildRegistration;
}

const ParentWizard = () => {

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

        let children = signUpData.registeredChildren.map((item, index) => {
            return <SecondPageForm data={signUpData} index={index} updateRegisteredChild={updateRegisteredChild} />;
        });

        const handleAddClick = (event) => {
            event.preventDefault();
            signUpData.registeredChildren.push({
                selectedSubjects: [],
                gradeLevel: '',
            });
            setState({ ...state });
        }

        const handleRemoveClick = (event) => {
            event.preventDefault();
            signUpData.registeredChildren.pop();
            setState({ ...state });
        }

        const showRemoveChildButton = signUpData.registeredChildren.length > 1;

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
            updateSignUpData({ [event.target.name]: event.target.value });
        };

        return (
            <SignUpChildWrapper>
                <ThirdPageForm data={signUpData} handleChange={handleChange}/>
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
                <FourthPageForm data={signUpData} handleCheck={handleCheck}/>
            </SignUpChildWrapper>
        );
    }

    const children = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />];
    
    return <Wizard content={children} />;
}

export default ParentWizard;