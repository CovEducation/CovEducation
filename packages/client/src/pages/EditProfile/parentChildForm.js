import React, { useState } from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { tags, subjects } from '../../constants.js';

const WizardInput = styled.div`
    margin-bottom: 1em;
    min-width: 300px;
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

const ParentChildForm = (props) => {

    console.log("propss", props);

    const [state, setState] = useState({});

    const gradeLevelMenuItems = tags.map((item, index) => (
        <MenuItem key={index} value={item.value}>
            <ListItemText primary={item.label} />
        </MenuItem>
    ));

    const subjectsMenuItems = subjects.map((item, index) => {
        //console.log("subjectsMenuItems", item, index);
        var isChecked = false;
        if(typeof props.data.registeredChildren[props.index].subjects !== "undefined")
        {
            isChecked = props.data.registeredChildren[props.index].subjects.indexOf(item.value) > -1;
        }
        
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
                    name="name"
                    onChange={handleChange}
                    value={props.data.registeredChildren[props.index].name}
                    required
                />
            </WizardInput>
            <WizardInput>
                {props.newStudent == false && 
                    <TextField
                        fullWidth
                        label="Student Email"
                        name="email"
                        value={props.data.registeredChildren[props.index].email}
                        required
                        readOnly
                    />
                }
                {props.newStudent == true && 
                    <TextField
                        fullWidth
                        label="Student Email"
                        name="email"
                        onChange={handleChange}
                        value={props.data.registeredChildren[props.index].email}
                        required
                    />
                }
            </WizardInput>
            <WizardInput>
                <InputLabel required>Grade Level</InputLabel>
                <Select
                    fullWidth
                    name="gradeLevel"
                    onChange={handleChange}
                    value={props.data.registeredChildren[props.index].gradeLevel}
                    children={gradeLevelMenuItems}
                    required
                    MenuProps={SelectMenuProps}
                />
            </WizardInput>
            <WizardInput>
                <InputLabel required>Student Seeking Assistance In</InputLabel>
                <Select
                    fullWidth
                    multiple
                    name='subjects'
                    renderValue={(selected) => selected.join(', ')}
                    children={subjectsMenuItems}
                    onChange={handleChange}
                    value={props.data.registeredChildren[props.index].subjects}
                    required
                    MenuProps={SelectMenuProps}
                />
            </WizardInput>
        </div>
    );
}

export default ParentChildForm;