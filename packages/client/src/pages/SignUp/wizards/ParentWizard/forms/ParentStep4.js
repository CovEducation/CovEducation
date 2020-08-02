import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '../../../../../components/Button';

import { Parent, Mentee } from '../../../../../models';
import useAuth from "../../../../../providers/AuthProvider";

const AgreementCheckboxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const ParentStep4 = (props) => {
    const Auth = useAuth();
    const isDisabled = !(props.data.agreedTermsOfService && props.data.agreedPrivacyPolicy)
    const handleSubmit = () => {
        // TODO(johancc) - on the child data, it says 'seletedGradeLevel' instead of 'selectedGradeLevel'.
        const userData = props.data;
        console.log(userData)
        const mentees = userData.registeredChildren
          .filter((child) => child.studentName && child.studentEmail && child.seletedGradeLevel && child.selectedSubjects)
          .map((child) => new Mentee(child.studentName, child.studentEmail, child.seletedGradeLevel, child.selectedSubjects));
        const newParent = new Parent(userData.parentName, userData.parentEmail, userData.timeZone, mentees);
        Auth.signup(userData.parentEmail, userData.password1, newParent);
    };
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