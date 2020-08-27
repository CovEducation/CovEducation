import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const WizardInput = styled.div`
    margin-bottom: 1em;
    min-width: 120px;
`;

const MentorStep3 = (props) => {

    return (
        <div>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Major"
                    name="major"
                    onChange={props.handleChange}
                    value={props.data.major}
                    required
                />
            </WizardInput>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Introduce Yourself"
                    multiline
                    name="introduction"
                    onChange={props.handleChange}
                    rows={4}
                    value={props.data.introduction}
                    required
                />
            </WizardInput>
        </div>
    );

}

export default MentorStep3;