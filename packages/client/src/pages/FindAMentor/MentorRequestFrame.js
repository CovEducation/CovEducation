import React from 'react';
import MentorProfile from './MentorProfile';

// Shows more detailed mentor information and allows parents to request mentors.
const MentorRequestFrame = ({ mentor,onSendRequest }) => (<MentorProfile mentor={mentor} onSubmit={onSendRequest}/>);

export default MentorRequestFrame;
