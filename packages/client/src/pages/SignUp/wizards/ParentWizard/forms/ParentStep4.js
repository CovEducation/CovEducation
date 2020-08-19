import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '../../../../../components/Button';
import useAuth from '../../../../../providers/AuthProvider';
import { Parent } from '../../../../../models';
const AgreementCheckboxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const ParentStep4 = (props) => {
    const { signup } = useAuth();

    const isDisabled = !(props.data.agreedTermsOfService && props.data.agreedPrivacyPolicy)

    const handleSubmit = async () => {
        const {
            parentName,
            parentEmail,
            password1,
            registeredChildren,
        } = props.data;

        const user = new Parent(
            parentName,
            parentEmail,
            {
                value: 'GMT-5',
                timezone: 'Central Daylight Time - Chicago (GMT-5)'
            },
            registeredChildren,
        );

        try {
            await signup(parentEmail, password1, user);
        } catch (e) {
            console.error('Failed to register parent ', JSON.stringify(props.data));
            console.error(e);
        }
    }
    return (
        <AgreementCheckboxWrapper>
            {JSON.stringify(props.data)}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.data.agreedTermsOfService}
                        name="agreedTermsOfService"
                        onChange={props.handleCheck}
                    />
                }
                label="I agree to the CovEd Terms of Service." />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.data.agreedPrivacyPolicy}
                        name="agreedPrivacyPolicy"
                        onChange={props.handleCheck}
                    />
                }
                label="I agree to the CovEd Privacy Policy." />
            <Button
                children={<div>Sign Up</div>}
                disabled={isDisabled}
                onClick={handleSubmit}
            />
        </AgreementCheckboxWrapper>
    )

}

export default ParentStep4;