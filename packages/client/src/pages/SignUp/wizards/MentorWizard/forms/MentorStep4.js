import React from 'react';
import Button from '../../../../../components/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { Mentor } from '../../../../../models';
import useAuth from "../../../../../providers/AuthProvider";

const MentorStep4 = (props) => {
    const Auth = useAuth();
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
    
    const handleSubmit = () => {
        // TODO(johancc) - Add timezone as part of the required fields.
        const userData = props.data;
        const newMentor = new Mentor(userData.mentorName, userData.mentorEmail, "EST", userData.introduction, userData.selectedSubjects, userData.selectedGradeLevels);
        Auth.signup(userData.mentorEmail, userData.password1, newMentor);
        alert("Success! Redirecting...");
    };

    return (
        <div>
            {JSON.stringify(props.data)}
            <FormGroup>
                {termsOfServiceControl}
                {privacyPolicyControl}
                <Button
                    disabled={isDisabled}
                    onClick={handleSubmit}
                    children={<div>Submit</div>}
                />
            </FormGroup>
        </div>
    )

}

export default MentorStep4;