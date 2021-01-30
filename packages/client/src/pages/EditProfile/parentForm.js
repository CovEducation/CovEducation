import React from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { timeZones, proNouns } from '../../constants.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup, { useRadioGroup } from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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


const ParentEditForm = (props) => {
    console.log("ParentEditForm props", props);
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
                    MenuProps={SelectMenuProps}
                    labelId="wizard-pronoun"
                    name="parentPronouns"
                    renderValue={(selected) => selected}
                    onChange={props.handleChange}
                    value={props.data.parentPronouns}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Parent Name"
                    name="parentName"
                    value={props.data.parentName}
                    onChange={props.handleChange}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Parent Email"
                    name="email"
                    value={props.data.parentEmail}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Parent Phone Number"
                    name="phone"
                    value={props.data.parentPhoneNumber}
                    onChange={props.handleChange}
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
                    renderValue={(selected) => selected}
                    value={props.data.timeZone}
                    onChange={props.handleChange}
                    required
                />
            </WizardInput>
            <WizardInput>
                <InputLabel id="wizard-notification-preference">Notification preference</InputLabel>
                <RadioGroup row name="notificationPreference" defaultValue={props.data.notificationPreference?props.data.notificationPreference:"phone"} onChange={props.handleChange}>
                    <FormControlLabel value="phone" control={<Radio color="primary" />} label="Phone" />
                    <FormControlLabel value="email" control={<Radio color="primary" />} label="Email" />
                </RadioGroup>
            </WizardInput>
        </div>
    );
}

export default ParentEditForm;