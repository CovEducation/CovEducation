import React from 'react';
import MentorProfile from './MentorProfile';
import Button from "../../components/Button";
import styled from "styled-components";
import { Auth, Db } from '../../providers/FirebaseProvider/index.js';

const firebase = require('firebase-admin');

const MentorRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Shows more detailed mentor information and allows parents to request mentors.
const MentorRequestFrame = ({ mentor }) => {
    const handleSubmit = async () => {
        console.log(mentor.email);
    }

    return (
        <MentorRequestContainer>
            <MentorProfile mentor={mentor}/>
            <Button onClick={handleSubmit}>Request</Button>
        </MentorRequestContainer>
    );
};

export default MentorRequestFrame;
