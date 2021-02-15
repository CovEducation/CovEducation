import React, { useState } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Stepper from '../../components/Stepper';
import Buttons from '../../components/Button';
import ParentStep1 from './wizards/ParentWizard/forms/ParentStep1.js';
import ParentStep2 from './wizards/ParentWizard/forms/ParentStep2.js';
import ParentStep3 from './wizards/ParentWizard/forms/ParentStep3.js';
import ParentStep4 from './wizards/ParentWizard/forms/ParentStep4.js';
import { createParentModel } from '../../models';
import useAuth from '../../providers/AuthProvider';
import MentorStep1 from './wizards/MentorWizard/forms/MentorStep1.js';
import MentorStep2 from './wizards/MentorWizard/forms/MentorStep2.js';
import MentorStep3 from './wizards/MentorWizard/forms/MentorStep3.js';
import MentorStep4 from './wizards/MentorWizard/forms/MentorStep4.js';
import { createMentorModel } from '../../models';

import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from "react-router-dom";

const SignUpPageWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
`;

const SignUpWizardWrapper = styled.div`
    padding: 1em;
`;

const WizardInput = styled.div`
    margin-bottom: 1em;
    min-width: 120px;
`;

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
var a = "";
let parentWizardSignUpData = {
    // Page 1
    username: undefined,
    password1: undefined,
    password2: undefined,
    userType: undefined,

    //Page 2
    parentName: undefined,
    parentEmail: undefined,
    parentPhoneNumber: undefined,
    timeZone: '',
    notificationPreference: "phone",

    // Page 3
    registeredChildren: [{
        studentName: undefined,
        studentEmail: undefined,
        selectedGradeLevel: '',
        selectedSubjects: [],
    }],

    //Page 4
    agreeTermsOfServce: undefined,
    agreePrivacyPolicy: undefined,
};

let mentorWizardSignUpData = {
    // Page 1
    username: undefined,
    password1: undefined,
    password2: undefined,
    userType: undefined,

    //Page 2
    mentorName: undefined,
    mentorEmail: undefined,
    selectedGradeLevels: [],
    selectedSubjects: [],
    notificationPreference: "phone",

    // Page 3
    major: undefined,
    introduction: undefined,

    //Page 4
    agreeTermsOfServce: undefined,
    agreePrivacyPolicy: undefined,
};



const SignUpPage = (props) => {

    const [userTypes, setUserTypes] = useState("MENTOR")
    const history = useHistory();
    const updateParentWizardSignUpData = (data) => {
        parentWizardSignUpData = { ...parentWizardSignUpData, ...data };
    }
    
    const updateRegisteredChild = (index, data) => {
        let childRegistrationInfo = parentWizardSignUpData.registeredChildren[index];
        let mergedChildRegistration = { ...childRegistrationInfo, ...data };
        parentWizardSignUpData.registeredChildren[index] = mergedChildRegistration;
    }

    const [state, setState] = useState({});
        
    
    const handleChangeUserType = (event) => {
        a = event.target.value;
        setUserTypes(a);
        setState({ ...state, [event.target.name]: event.target.value });
        updateParentWizardSignUpData({ [event.target.name]: event.target.value });
    };

    
    
    const FirstPage = () => {
    
        const [state, setState] = useState({});
        
    
        const handleChange = (event) => {
            a = event.target.value;
            setState({ ...state, [event.target.name]: event.target.value });
            if(userTypes == "MENTOR")
            {
                updateMentorWizardSignUpData({ [event.target.name]: event.target.value });
            }
            else {
                updateParentWizardSignUpData({ [event.target.name]: event.target.value });
            }
        };
    
        return (
            <ParentStep1 data={parentWizardSignUpData} handleChange={handleChange} />
        );
    }
    
    const SecondPage = () => {
    
        const [state, setState] = useState({});
    
        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateParentWizardSignUpData({ [event.target.name]: event.target.value });
        };
    
        return (
            <ParentStep2 data={parentWizardSignUpData} handleChange={handleChange} />
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
                selectedGradeLevel: '',
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
            <div>
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
            </div>
        );
    }
    
    const FourthPage = () => {
        const [state, setState] = useState({});
        const { signup } = useAuth();
        const handleCheck = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
            updateParentWizardSignUpData({ [event.target.name]: event.target.checked });
        };
    
        return (
            <div>
                <ParentStep4 data={parentWizardSignUpData} 
                    handleCheck={handleCheck} 
                    onClick={ async () => {
                        var res = await signup(
                            parentWizardSignUpData.parentEmail, 
                            parentWizardSignUpData.password1, 
                            createParentModel(parentWizardSignUpData)
                            );
                            if(res.success)
                            {
                                // alert('Signed in! Redirecting to dashboard...');
                                history.push('/dashboard/profile');

                            }
                            else {
                                alert(res.message);
                            }
                        }
                    }/>
                        
            </div>
        );
    }
    
    
    
    
    const updateMentorWizardSignUpData = (data) => {
        mentorWizardSignUpData = { ...mentorWizardSignUpData, ...data };
    }
    
    const FirstPageMentor = () => {
        const [state, setState] = useState({});
    
        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateMentorWizardSignUpData({ [event.target.name]: event.target.value });
        };
    
        return (
            <MentorStep1 data={mentorWizardSignUpData} handleChange={handleChange} />
        );
    }
    
    const SecondPageMentor = () => {
    
        const [state, setState] = useState({});
    
        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateMentorWizardSignUpData({ ...state, [event.target.name]: event.target.value });
        }
    
        return (
            <MentorStep2 data={mentorWizardSignUpData} handleChange={handleChange} />
        );
    }
    
    const ThirdPageMentor = () => {
    
        const [state, setState] = useState({
            selectedGradeLevels: mentorWizardSignUpData.selectedGradeLevels ?? [],
            selectedSubjects: mentorWizardSignUpData.selectedSubjects ?? [],
        });
    
        const { selectedGradeLevels, selectedSubjects } = state;
    
        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.value });
            updateMentorWizardSignUpData({ [event.target.name]: event.target.value });
        };
    
        return (
            <MentorStep3 data={mentorWizardSignUpData} handleChange={handleChange} selectedGradeLevels={selectedGradeLevels} selectedSubjects={selectedSubjects} />
        );
    }
    
    const FourthPageMentor = () => {
    
        const [state, setState] = useState({});
        const { signup } = useAuth();
    
        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
            updateMentorWizardSignUpData({ [event.target.name]: event.target.checked });
        };
    
        return (
            <div>
                <MentorStep4
                    data={mentorWizardSignUpData}
                    handleChange={handleChange}
                    onClick={ async () => {
                        var response = await signup(
                            mentorWizardSignUpData.mentorEmail,
                            mentorWizardSignUpData.password1,
                            createMentorModel(mentorWizardSignUpData)
                        )
                        if(response.success)
                        {
                            // alert('Signed in! Redirecting to dashboard...');
                            history.push('/dashboard/profile');
                        }
                        else {
                            alert(response.message);
                        }
                    }}
                    />
            </div>
        );
    }
    
    
    return (
        <div>
                <SignUpWizardWrapper>
                <WizardInput>
                    <InputLabel id="wizard-notification-preference">User Type</InputLabel>
                    <RadioGroup row name="userType" defaultValue="MENTOR">
                        <FormControlLabel value="MENTOR" control={<Radio color="primary"/>} label="MENTOR" onChange={handleChangeUserType}/>
                        <FormControlLabel value="PARENT" control={<Radio color="primary" />} label="PARENT" onChange={handleChangeUserType}/>
                    </RadioGroup>
                </WizardInput>
                    
                {userTypes === "MENTOR" && 
                <>
                    <FirstPageMentor />
                    <SecondPageMentor />
                    <ThirdPageMentor />
                    <FourthPageMentor />
                </>
                }
                {userTypes === "PARENT" && 
                <>
                    <FirstPage />
                    <SecondPage />
                    <ThirdPage />
                    <FourthPage />
                </>
                }
            </SignUpWizardWrapper>
        </div>
    );
}

export default SignUpPage;
