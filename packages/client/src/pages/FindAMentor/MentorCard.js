import React from 'react';
import styled from 'styled-components';

const MentorCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 280px;
    min-width: 180px;
    margin: 0.75rem;
    cursor: pointer;
`

const MentorCardText = styled.p`
    font-size: 12px;
`

const MentorCard = ({ mentor }) => {
    return (
        <MentorCardContainer>
            <img src={mentor.avatar || `${process.env.PUBLIC_URL}/stock-profile.png`}  alt='profile pic'/>
            <MentorCardText><b>{mentor.name}</b></MentorCardText>
            <MentorCardText>{mentor.timezone}</MentorCardText>
            <MentorCardText>{mentor.subjects.join(', ')}</MentorCardText>
            <MentorCardText>{mentor.gradelevels.join(', ')}</MentorCardText>
        </MentorCardContainer>
    );
}

export default MentorCard;