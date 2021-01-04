import React from 'react';
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
    const { user } = useAuth();

    if (!validateMentorData(mentor)) return (<></>);

    const relevantInformation = [
        ['subjects', 'Subjects'],
        ['location', 'Location'],
        ['grade_levels_to_mentor', 'Grades'],
        ['timezone', 'Timezone'],
        ['languages_spoken', 'Languages'],
        ['email', 'Email']
    ];


    const sendRequest = async (email) => {
        if (Auth.currentUser === undefined || Auth.currentUser === null) {
            throw Error('Unable to retrive user data with uninitilized Auth user.');
        }
        var message = document.getElementById('request').value
        const data = { mentorEmailAddress: mentor.email, message: message, parentId: Auth.currentUser.uid};
        //const data = {messageID: "rS3KmaQH5wZs8mIKazqT", requestStatus: "Rejected"};
        //const data = {messageID: "rS3KmaQH5wZs8mIKazqT", ratings: 4.3};
        //const data = { id: "wp68UuyOlmUQmqMWMSKv1SC9ozz1"};
        fetch('http://localhost:3000/request/sendRequest', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log("data", data);
            if(data.status == 200)
            {
                alert("Request was sent successfully.");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <MentorProfileContainer>
            <MentorProfileHeader>
                <MentorProfilePicture src={mentor.avatar || `${process.env.PUBLIC_URL}/stock-profile.png`} alt='Profile' />
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
            {user.role === 'PARENT' && 
            <>
            <WizardInput>
                <TextField
                    fullWidth
                    label="Request Message"
                    name="request"
                    id="request"
                />
            </WizardInput>
            <ButtonBlock>
            <Button theme="accent" size="md" onClick={sendRequest}>Send Request</Button>
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
        <div>
            <MentorProfileText>{field[1]}</MentorProfileText>
            <MentorProfileText>{mentorInfo}</MentorProfileText>
        </div>
    )
};

export default MentorProfile;
