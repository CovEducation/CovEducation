import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '../../../../../components/Button';

const AgreementCheckboxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const ParentStep4 = (props) => {

    const isDisabled = !(props.data.agreedTermsOfService && props.data.agreedPrivacyPolicy)

    return (
        <AgreementCheckboxWrapper>
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
                onClick={props.onClick}
            />
        </AgreementCheckboxWrapper>
    )

}

export default ParentStep4;