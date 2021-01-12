import React from 'react';
import Button from '../../../../../components/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const MentorStep4 = (props) => {

    const termsOfServiceCheckbox = (
        <Checkbox
            checked={props.data.termsOfService}
            name="termsOfService"
            onChange={props.handleChange} />
    );

    const termsOfServiceControl = (
        <FormControlLabel
            control={termsOfServiceCheckbox}
            label="I agree to the CovEd Terms of Service."
            required
        />
    );

    const privacyPolicyCheckbox = (
        <Checkbox
            checked={props.data.privacyPolicy}
            name="privacyPolicy"
            onChange={props.handleChange} />
    );
    const privacyPolicyControl = (
        <FormControlLabel
            control={privacyPolicyCheckbox}
            fullWidth
            label="I agree to the CovEd Privacy Policy."
            required
        />
    );

    const isDisabled = !(props.data.termsOfService && props.data.privacyPolicy);

    return (
        <div>
            <FormGroup>
                {termsOfServiceControl}
                {privacyPolicyControl}
                <Button
                    disabled={isDisabled}
                    children={<div>Submit</div>}
                    onClick={props.onClick}
                />
            </FormGroup>
        </div>
    )

}

export default MentorStep4;