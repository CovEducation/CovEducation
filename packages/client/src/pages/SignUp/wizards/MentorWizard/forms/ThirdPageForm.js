import React from 'react';
import styled from 'styled-components';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

import { tags, subjects } from '../../../../../constants.js';

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

const ThirdPageForm = (props) => {

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
            <Checkbox value={item.value} checked={props.selectedSubjects.indexOf(item.value) > -1} />
            {item.label}
        </MenuItem>
    ));

    return (
        <div>
            {JSON.stringify(props.data)}
            <WizardInput>
                <TextField
                    fullWidth
                    label="Name"
                    name="mentorName"
                    onChange={props.handleChange}
                    value={props.data.mentorName}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Email"
                    name="mentorEmail"
                    onChange={props.handleChange}
                    value={props.data.mentorEmail}
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
                    onChange={props.handleChange}
                    value={props.data.preferredGradeLevel}
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
                    onChange={props.handleChange}
                    value={props.data.preferredSubjects}
                    required
                />
            </WizardInput>
        </div>
    );

}

export default ThirdPageForm;