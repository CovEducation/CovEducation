import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import Button from '../../components/Button';
import useAuth, { AUTH_STATES } from "../../providers/AuthProvider";
import Modal from '../../components/Modal';
import SpeakerCard from './SpeakerCard';
import SpeakerDetailFrame from './SpeakerDetailFrame.js';

const SpeakerSeriesPageWrapper = styled.div`
  padding: 100px;
`;
const SpeakerSeriesHeader = styled.div`
  padding-bottom: 48px;
  display: block;
  align-items: center;
  margin: 0 auto;
  text-align: center;

  div {
    align-items: center;
    margin: 0 auto;
  }

  img {
    border-radius: 50%;
    margin-right: 50px;
  }

  h1 {
    font-size: 45px;
    margin: 0;
  }

  p {
    font-size: 24px;
    margin: 0;
  }
`;
const SpeakerSeriesWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;
const RequestDetailsBlock = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  p {
    font-size: 24px;
  }
  span {
    color:${COLORS.blue};
    border-bottom : 2px solid;
  }
`;


const speakerSeries = [
  {
      '_id' : '5ee15af7e790bd0a065b70f9',
      'image': `${process.env.PUBLIC_URL}/stock-profile.png`,
      'date' : 'March 06,2020',
      'name' : 'Speaker Event 1',
      'description' : 'This event was a speaker panel involving a group of leaders',
  },
  {
    '_id' : '5ee15af7e790bd0a065b70f9',
    'image': `${process.env.PUBLIC_URL}/stock-profile.png`,
    'date' : 'March 06,2020',
    'name' : 'Speaker Event 2',
    'description' : 'This event was a speaker panel involving a group of leaders',
  },
  {
    '_id' : '5ee15af7e790bd0a065b70f9',
    'image': `${process.env.PUBLIC_URL}/stock-profile.png`,
    'date' : 'March 06,2020',
    'name' : 'Speaker Event 3',
    'description' : 'This event was a speaker panel involving a group of leaders',
  },
  {
    '_id' : '5ee15af7e790bd0a065b70f9',
    'image': `${process.env.PUBLIC_URL}/stock-profile.png`,
    'date' : 'March 06,2020',
    'name' : 'Speaker Event 4',
    'description' : 'This event was a speaker panel involving a group of leaders',
  },
];

const SpeakerSeriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 50px;
`
const SpeakerSeriesPage = () => {
 

  return (
    <SpeakerSeriesPageWrapper>
      <SpeakerSeriesHeader>
        <div>
          <h1>Speaker Series</h1>
        </div>
      </SpeakerSeriesHeader>
      <SpeakerSeriesWrapper>
      <SpeakerSeriesContainer>
            {speakerSeries.map(speaker => {
                return (
                    <Modal title={speaker.name} key={speaker._id} trigger={<div><SpeakerCard speaker={speaker} /></div>}>
                        <SpeakerDetailFrame speaker={speaker}/>
                    </Modal>
                );
            })}
        </SpeakerSeriesContainer>
      </SpeakerSeriesWrapper>
    </SpeakerSeriesPageWrapper>
  )
}

export default SpeakerSeriesPage;
