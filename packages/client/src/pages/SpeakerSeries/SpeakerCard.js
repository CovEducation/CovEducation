import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const SpeakerCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 280px;
    min-width: 180px;
    margin: 1.75rem;
    cursor: pointer;
`

const SpeakerCardText = styled.h2`
    margin-top: 3px;
    margin-bottom: 0;
    text-align: left;
    font-weight: 400;
`
const SpeakerCardDescription = styled.p`
`

const SpeakerCard = ({ speaker }) => {
    return (
        <SpeakerCardContainer>
            <img src={`https://via.placeholder.com/300x200?text=${speaker.name}`} alt='profile pic' style={{marginBottom:15}}/>
            <SpeakerCardText>{moment(speaker.date).format('LL')}</SpeakerCardText>
            <SpeakerCardText>{speaker.name}</SpeakerCardText>
            <SpeakerCardDescription>{speaker.description}</SpeakerCardDescription>
        </SpeakerCardContainer>
    );
}

export default SpeakerCard;