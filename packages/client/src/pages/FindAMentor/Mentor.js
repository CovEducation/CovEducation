import React from 'react';
import styled from 'styled-components';

const MentorContainer = styled.div`
    padding: 0 5rem;
`;

const MentorHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

const MentorInformation = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;



// Displays the picture, name, and major of a mentor.
const Mentor = ({ mentor }) => {
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
        <MentorContainer>
            <MentorHeader>
                <img src={mentor.avatar} alt='Profile' />
                <div>
                    <h3>{mentor.name}</h3>
                    <h4>{mentor.school}</h4>
                    <h4>{mentor.major}</h4>
                </div>
            </MentorHeader>
            {mentor.bio !== null &&
                <div>
                    <p>Bio</p>
                    <p>{mentor.bio}</p>
                </div>
            }
            <MentorInformation>
                {relevantInformation.map(field => displayField(field, mentor))}
            </MentorInformation>
        </MentorContainer>
    )
}

const validateMentorData = (mentor) => {
    if (mentor === undefined || mentor === null) return false;
    // TODO(johancc) - Implement a more through validation if needed.
    return true;
}

const displayField = (field, mentor) => {
    let mentorInfo = mentor[field[0]];
    if (Array.isArray(mentorInfo)) {
        mentorInfo = mentorInfo.join(', ');
    }
    return (
        <div>
            <p>{field[1]}</p>
            <p>{mentorInfo}</p>
        </div>
    )
};

export default Mentor;
