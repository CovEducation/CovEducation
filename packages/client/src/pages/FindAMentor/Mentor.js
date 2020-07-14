import React, { useState } from 'react';

// Displays the picture, name, and major of a mentor.
const Mentor = (mentor) => {
    if (!validateMentorData(mentor)) return (<></>);
    
    return (
        <div className="container">
            <div className="row">
                <img width="100%" height="100%"src={mentor.profilePicture}/>
            </div>
            <div className="row">
                {mentor.name}
                {mentor.major}
                {mentor.subjects}
            </div>
        </div>
    )
    
}

const validateMentorData = (mentor) => {
    if (mentor === undefined || mentor === null) return false;
    // TODO(johancc) - Implement a more through validation if needed.
    return true;
}

export default Mentor;
