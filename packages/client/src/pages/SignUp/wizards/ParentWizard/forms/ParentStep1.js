import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const WizardInput = styled.div`
    margin-bottom: 1em;
    min-width: 120px;
`;

const ParentStep1 = (props) => {
    return (
        <div>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    onChange={props.handleChange}
                    value={props.data.username}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Password"
                    name="password1"
                    onChange={props.handleChange}
                    type="password"
                    value={props.data.password1}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Confirm Password"
                    name="password2"
                    onChange={props.handleChange}
                    type="password"
                    value={props.data.password2}
                    required
                />
            </WizardInput>
        </div>
    );
}

export default ParentStep1;