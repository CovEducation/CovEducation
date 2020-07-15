import React, { useState } from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MentorWizard from './wizards/MentorWizard.js';
import ParentWizard from './wizards/ParentWizard.js';


const SignUpPageWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
`;

const SignUpWizardWrapper = styled.div`
    padding: 1em;
`;

function TabPanel(props) {
    const { children, value, index } = props;
    return (value === index) ? (
        <div>
            {children}
        </div>
    ) : null;
}

const TabManager = (tabChildren) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let tabChildComponents = Array.from(tabChildren).map((item, index) => {
        return (
            <TabPanel key={index} index={index} value={value}>
                {item}
            </TabPanel>
        );
    });

    return (
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="For Parents" />
                <Tab label="For Mentors" />
            </Tabs>
            {tabChildComponents}
        </AppBar>
    );
}

const SignUpPage = () => {

    let tabChildren = [<ParentWizard  />, <MentorWizard />];
    let tabManager = TabManager(tabChildren);
    
    return (
        <SignUpPageWrapper>
            <SignUpWizardWrapper>
                {tabManager}
            </SignUpWizardWrapper>
        </SignUpPageWrapper>
    )
}

export default SignUpPage;