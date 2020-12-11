import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import TextField from '@material-ui/core/TextField';

const WizardInput = styled.div`
    margin-bottom: 1em;
    min-width: 120px;
`;

const MentorProfileContainer = styled.div`
    padding: 0 5rem;
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
    width: 30%;
    margin-right: 1rem;
`

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
const MentorProfile = ({ mentor }) => {
    if (!validateMentorData(mentor)) return (<></>);

    const relevantInformation = [
        ['subjects', 'Subjects'],
        ['location', 'Location'],
        ['grade_levels_to_mentor', 'Grades'],
        ['timezone', 'Timezone'],
        ['languages_spoken', 'Languages'],
        ['email', 'Email']
    ];

    return (
        <MentorProfileContainer>
            <MentorProfileHeader>
                <MentorProfilePicture src={mentor.avatar || 'stock-profile.png'} alt='Profile' />
                <div>
                    <h3>{mentor.name}</h3>
                    <h4>{mentor.school}</h4>
                    <h4>{mentor.major}</h4>
                </div>
            </MentorProfileHeader>
            {mentor.bio !== null &&
                <div>
                    <p>Bio</p>
                    <p>{mentor.bio}</p>
                </div>
            }
            <MentorProfileInformation>
                {relevantInformation.map(field => displayField(field, mentor))}
            </MentorProfileInformation>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Request Message"
                    name="request"
                />
            </WizardInput>
            <ButtonBlock>
            <Button theme="accent" size="md" onClick={ async () => {
                    alert('Request Button Pressed');
                }}>Send Request</Button>
            </ButtonBlock>
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
        <div>
            <MentorProfileText>{field[1]}</MentorProfileText>
            <MentorProfileText>{mentorInfo}</MentorProfileText>
        </div>
    )
};

export default MentorProfile;
