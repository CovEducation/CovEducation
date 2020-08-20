import React from 'react';
import Button from '../../../../../components/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import useAuth from '../../../../../providers/AuthProvider';
import { Mentor } from '../../../../../models';

const MentorStep4 = (props) => {
    const { signup, user } = useAuth();

    const {
        mentorEmail,
        mentorName,
        password1,
        selectedGradeLevels,
        selectedSubjects,
        major,
        introduction,
    } = props.data;

    const handleSubmit = async () => {
        try {
            const newUser = new Mentor(
                mentorName,
                mentorEmail,
                {
                    value: "GMT-5",
                    timezone: "Central Daylight Time - Chicago (GMT-5)"
                },
                introduction,
                selectedSubjects,
                selectedGradeLevels
            )
            const res = await signup(mentorEmail, password1, newUser);
            console.log(user)
        } catch (e) {
            console.error("There was an error registering mentor");
            console.error(props.data);
            console.error(e);
        }
    }

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
            {JSON.stringify(props.data)}
            <FormGroup>
                {termsOfServiceControl}
                {privacyPolicyControl}
                <Button
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    children={<div>Submit</div>}
                />
            </FormGroup>
        </div>
    )

}

export default MentorStep4;