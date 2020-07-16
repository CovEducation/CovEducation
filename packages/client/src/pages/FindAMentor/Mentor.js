import React from 'react';

// Displays the picture, name, and major of a mentor.
const Mentor = ({ mentor }) => {
    if (!validateMentorData(mentor)) {
        return (<></>);
    } else {
        return (
            <div className="container">
                <img width="175px"
                     src={ mentor.avatar }
                     alt="profile-pic" />
                <h2>{ mentor.major }</h2>
                <h3>{ mentor.subjects.join(', ') }</h3>
            </div>
        )
    }
}

const validateMentorData = (mentor) => {
    return !(mentor === undefined || mentor === null);
    // TODO(johancc) - Implement a more through validation if needed.
}

export default Mentor;
