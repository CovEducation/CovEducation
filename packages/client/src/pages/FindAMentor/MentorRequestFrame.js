import React from 'react';
import MentorProfile from './MentorProfile';

// Shows more detailed mentor information and allows parents to request mentors.
const MentorRequestFrame = ({ mentor,onSendRequest, disable }) => (<MentorProfile mentor={mentor} onSubmit={onSendRequest} disable={disable}/>);

export default MentorRequestFrame;
