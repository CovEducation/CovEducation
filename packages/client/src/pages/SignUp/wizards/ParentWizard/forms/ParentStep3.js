import React, { useState } from 'react';
import styled from 'styled-components';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

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

const ParentStep3 = (props) => {

    const [state, setState] = useState({});

    const gradeLevelMenuItems = tags.map((item, index) => (
        <MenuItem key={index} value={item.value}>
            <ListItemText primary={item.label} />
        </MenuItem>
    ));

    const subjectsMenuItems = subjects.map((item, index) => {
        const isChecked = props.data.registeredChildren[props.index].selectedSubjects.indexOf(item.value) > -1;
        return (
            <MenuItem key={index} value={item.value}>
                <Checkbox
                    checked={isChecked}
                    value={item.value}
                />
                <ListItemText primary={item.label} />
            </MenuItem>
        );
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        props.updateRegisteredChild(props.index, { ...state, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <label>Student Information</label>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Student Name"
                    name="studentName"
                    onChange={handleChange}
                    value={props.data.registeredChildren[props.index].studentName}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Student Email"
                    name="studentEmail"
                    onChange={handleChange}
                    value={props.data.registeredChildren[props.index].studentEmail}
                    required
                />
            </WizardInput>
            <WizardInput>
                <InputLabel required>Grade Level</InputLabel>
                <Select
                    children={gradeLevelMenuItems}
                    fullWidth
                    name="selectedGradeLevel"
                    onChange={handleChange}
                    value={props.data.registeredChildren[props.index].selectedGradeLevel}
                    required
                />
            </WizardInput>
            <WizardInput>
                <InputLabel required>Student Seeking Assistance In</InputLabel>
                <Select
                    children={subjectsMenuItems}
                    fullWidth
                    MenuProps={SelectMenuProps}
                    multiple
                    name='selectedSubjects'
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    value={props.data.registeredChildren[props.index].selectedSubjects}
                    required
                />
            </WizardInput>
        </div>
    );
}

export default ParentStep3;