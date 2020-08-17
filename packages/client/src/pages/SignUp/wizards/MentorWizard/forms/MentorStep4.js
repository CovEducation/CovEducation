import React from 'react';
import Button from '../../../../../components/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import useAuth from '../../../../../providers/AuthProvider';
import { Mentor } from '../../../../../models';

const MentorStep4 = (props) => {
    const { signup } = useAuth();

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

    const handleSubmit = async () => {
        console.log(props.data);
        const {
            mentorName,
            mentorEmail,
            password1,
            introduction,
            selectedSubjects,
            selectedGradeLevels
        } = props.data;

        const user = new Mentor(
            mentorName,
            mentorEmail,
            {
                value: "GMT-5",
                timezone: "Central Daylight Time - Chicago (GMT-5)"
            },
            introduction,
            selectedSubjects,
            selectedGradeLevels
        );

        try {
            await signup(mentorEmail, password1, user);
        } catch (e) {
            console.error("Failed to register mentor ", JSON.stringify(props.data));
            console.error(e);
        }
    }

    const isDisabled = !(props.data.termsOfService && props.data.privacyPolicy);

    return (
        <div>
            {JSON.stringify(props.data)}
            <FormGroup>
                {termsOfServiceControl}
                {privacyPolicyControl}
                <Button
                    disabled={isDisabled}
                    children={<div>Submit</div>}
                    onClick={handleSubmit}
                />
            </FormGroup>
        </div>
    )

}

export default MentorStep4;