import React from 'react';
import styled from 'styled-components';

const MentorCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 280px;
    margin: 0.75rem;
`

const MentorCardText = styled.p`
    font-size: 12px;
`

const MentorCard = ({ mentor }) => {
    return (
        <MentorCardContainer>
            <img src={mentor.avatar || `stock-profile.png`} width='70%' alt='profile pic'/>
            <MentorCardText><b>{mentor.name}</b></MentorCardText>
            <MentorCardText>{mentor.timezone}</MentorCardText>
            <MentorCardText>{mentor.subjects.join(', ')}</MentorCardText>
            <MentorCardText>{mentor.grade_levels_to_mentor.join(', ')}</MentorCardText>
        </MentorCardContainer>
    );
}

export default MentorCard;