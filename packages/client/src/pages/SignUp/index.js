import React, { useState } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MentorWizard from './wizards/MentorWizard';
import ParentWizard from './wizards/ParentWizard';

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
    return (value === index) ? children : null;
}

const TabManager = (tabChildren) => {
    const [value, setValue] = useState(0);

    const handleChange = (_event, newValue) => {
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
        <>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="For Parents" />
                <Tab label="For Mentors" />
            </Tabs>
            {tabChildComponents}
        </>
    );
}

const SignUpPage = () => {

    const tabChildren = [<ParentWizard />, <MentorWizard />];
    const tabManager = TabManager(tabChildren);
    return (
        <SignUpWizardWrapper>
            {tabManager}
        </SignUpWizardWrapper>
    );
}

export default SignUpPage;
