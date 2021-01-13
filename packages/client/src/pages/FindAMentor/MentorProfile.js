import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import TextField from '@material-ui/core/TextField';
import {Auth} from '../../providers/FirebaseProvider';
import useAuth from "../../providers/AuthProvider";

const WizardInput = styled.div`
    margin-bottom: 1em;
    min-width: 120px;
`;

const MentorProfileContainer = styled.div`
    padding: 0 50px;
`;

const MentorProfileHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

const MentorProfileInformation = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const MentorProfilePicture = styled.img`
    width: 20%;
    margin-right: 1rem;
    border-radius: 100%;
`

const MentorDetailsBlock = styled.div`
    h3 {
        font-size: 1.5rem;
        font-weight: 400;
        margin: 10px 0;
    }
    h4 {
        font-weight: 400;
        margin: 0;
        font-size: 1.2rem;
    }
`;

const MentorProfileText = styled.p`
    margin-right: 0.5rem;
`


const ButtonBlock = styled.div`
    text-align: right;
    button {
        margin-right: 0px;
    }
`


// Displays the picture, name, and major of a mentor.
const MentorProfile = ({ mentor, onSubmit }) => {
    const { user, sendRequestToMentor } = useAuth();
    const [userMessage, setUserMessage] = useState("Hi New Parent Request");

    if (!validateMentorData(mentor)) return (<></>);

    const relevantInformationMentor = [
        ['subjects', 'Subjects'],
        ['location', 'Location'],
        ['grade_levels_to_mentor', 'Grades'],
        ['timezone', 'Timezone'],
        ['languages_spoken', 'Languages'],
        ['email', 'Email']
    ];

    const relevantInformationParent = [
        ['subjects', 'Subjects'],
        ['location', 'Location'],
        ['grade_levels_to_mentor', 'Grades'],
        ['timezone', 'Timezone'],
        ['languages_spoken', 'Languages'],
    ];

    const sendRequest = async(email) => {
        await onSubmit(email,userMessage);
    }
    
    return (
        <MentorProfileContainer key={mentor.objectID}>
            <MentorProfileHeader>
                <MentorProfilePicture src={mentor.avatar || `${process.env.PUBLIC_URL}/stock-profile.png`} alt='Profile' />
                <MentorDetailsBlock>
                    <h3>{mentor.name}</h3>
                    <h4>{mentor.school}</h4>
                    <h4>{mentor.major}</h4>
                </MentorDetailsBlock>
                <div>
                    
                </div>
            </MentorProfileHeader>
            {mentor.bio !== null &&
                <div>
                    <p><b>Bio</b></p>
                    <p>{mentor.bio}</p>
                </div>
            }
            <MentorProfileInformation>
            {user.role === 'PARENT' ? (
                relevantInformationParent.map(field => displayField(field, mentor))
            ) : (
                relevantInformationMentor.map(field => displayField(field, mentor))
            )} 
            </MentorProfileInformation>
            {user.role === 'PARENT' && 
            <>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Request Message"
                    name="request"
                    id="request"
                    onChange={(e) => {setUserMessage(e.target.value);}}
                />
            </WizardInput>
            <ButtonBlock>
            <Button theme="accent" size="md" onClick={ () => sendRequest(mentor.email)}>Send Request</Button>
            </ButtonBlock>
            </>
            }
        </MentorProfileContainer>
    )
}

const validateMentorData = (mentor) => {
    if (mentor === undefined || mentor === null) return false;
    // TODO(johancc) - Implement a more through validation if needed.
    return true;
}

const displayField = (field, mentor) => {
    console.log("mentor", mentor);
    let mentorInfo = mentor[field[0]];
    if (Array.isArray(mentorInfo)) {
        mentorInfo = mentorInfo.join(', ');
    }
    return (
        <>
        {mentorInfo && 
        <div>
            <MentorProfileText><b>{field[1]}</b></MentorProfileText>
            <MentorProfileText>{mentorInfo}</MentorProfileText>
        </div>
        }
        </>
    )
};

export default MentorProfile;
