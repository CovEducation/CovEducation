import React from 'react';
import Mentor from '../FindAMentor/Mentor';

const ProfilePage = () => {
    const mentor = {
        '_id' : '5ee15af7e790bd0a065b70f9',
        'subjects' : ['Physics', 'Math'],
        'languages_spoken' : ['English', 'Spanish'],
        'grade_levels_to_mentor' : ['Middle School', 'High School'],
        'mentees' : [],
        'tags' : [],
        'firebase_uid' : 'sNku1aj94rZz0fLYwFwW2qhvdFI3',
        'name' : 'Maria Mentor',
        'email' : 'mariamentor@coved.org',
        'timezone' : 'Central Daylight Time - Chicago (GMT-5)',
        'bio' : 'Hello! My name is Maria Mentor and I am a Rising Senior at UCLA studying History',
        'major' : 'Computer Science',
        'last_request' : '2020-06-10T22:13:11.769Z',
        'public' : true,
        '__v' : 0
    };

    return (
        // <div>Profile page</div>
        <Mentor mentor={mentor}/>
    )
}

export default ProfilePage;
