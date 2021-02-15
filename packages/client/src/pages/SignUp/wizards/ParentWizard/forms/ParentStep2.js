import React from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { timeZones, proNouns } from '../../../../../constants.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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


const ParentStep2 = (props) => {

    const timeZoneMenuItems = timeZones.map(item => {
        return <MenuItem key={item.value} value={item.timezone}>{item.timezone}</MenuItem>;
    });


    const proNounsMenuItems = proNouns.map(item => {
        return <MenuItem key={item.value} value={item.pronoun}>{item.pronoun}</MenuItem>;
    });


    return (
        <div>
            <br />
            <label>Parent Information</label>
             <WizardInput>
                <br />
                <InputLabel id="wizard-pronouns" required>Pronouns</InputLabel>
                <Select
                    children={proNounsMenuItems}
                    displayEmpty
                    fullWidth
                    labelId="wizard-pronoun"
                    MenuProps={SelectMenuProps}
                    name="pronouns"
                    onChange={props.handleChange}
                    renderValue={(selected) => selected}
                    value={props.data.pronouns}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Parent Name"
                    name="parentName"
                    onChange={props.handleChange}
                    value={props.data.parentName}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Parent Email"
                    name="parentEmail"
                    onChange={props.handleChange}
                    value={props.data.parentEmail}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Parent Phone Number"
                    name="parentPhoneNumber"
                    onChange={props.handleChange}
                    value={props.data.parentPhoneNumber}
                    required
                />
            </WizardInput>
            <WizardInput>
                <InputLabel id="wizard-time-zone" required>Time Zone</InputLabel>
                <Select
                    children={timeZoneMenuItems}
                    displayEmpty
                    fullWidth
                    labelId="wizard-preferred-subjects"
                    MenuProps={SelectMenuProps}
                    name="timeZone"
                    onChange={props.handleChange}
                    renderValue={(selected) => selected}
                    value={props.data.timeZone}
                    required
                />
            </WizardInput>
            <WizardInput>
                <InputLabel id="wizard-notification-preference">Notification preference</InputLabel>
                <RadioGroup row name="notificationPreference" defaultValue="phone">
                    <FormControlLabel value="phone" control={<Radio color="primary" />} label="Phone" onChange={props.handleChange}/>
                    <FormControlLabel value="email" control={<Radio color="primary" />} label="Email" onChange={props.handleChange}/>
                </RadioGroup>
            </WizardInput>
        </div>
    );
}

export default ParentStep2;