import React, {useState} from 'react';
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

const MentorStep2 = (props) => {

    const [state, setState] = useState({
        selectedGradeLevels: [],
        selectedSubjects: [],
    });

    const { selectedGradeLevels, selectedSubjects } = state;

    const gradeLevelMenuItems = tags.map(item => (
        <MenuItem key={item.value} value={item.value}>
            <Checkbox value={item.value} checked={selectedGradeLevels.indexOf(item.value) > -1} />
            {item.label}
        </MenuItem>
    ));

    const subjectsMenuItems = subjects.map(item => (
        <MenuItem key={item.value} value={item.value}>
            <Checkbox value={item.value} checked={selectedSubjects.indexOf(item.value) > -1} />
            {item.label}
        </MenuItem>
    ));

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        props.handleChange(event);
    }

    return (
        <div>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Name"
                    name="mentorName"
                    onChange={handleChange}
                    value={props.data.mentorName}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Email"
                    name="mentorEmail"
                    onChange={handleChange}
                    value={props.data.mentorEmail}
                    required
                />
            </WizardInput>
            <WizardInput>
                <InputLabel id="wizard-preferred-grade-level">Preferred Grade Level</InputLabel>
                <Select
                    children={gradeLevelMenuItems}
                    fullWidth
                    labelId="wizard-preferred-grade-level"
                    MenuProps={SelectMenuProps}
                    multiple
                    name="selectedGradeLevels"
                    renderValue={(selected) => selected.join(", ")}
                    onChange={handleChange}
                    value={props.data.selectedGradeLevels}
                    required
                />
            </WizardInput>
            <WizardInput>
                <InputLabel>Preferred Subjects</InputLabel>
                <Select
                    children={subjectsMenuItems}
                    fullWidth
                    MenuProps={SelectMenuProps}
                    multiple
                    name="selectedSubjects"
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(", ")}
                    value={props.data.selectedSubjects}
                    required
                />
            </WizardInput>
        </div>
    );
}

export default MentorStep2;