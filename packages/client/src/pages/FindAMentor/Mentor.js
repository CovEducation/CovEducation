import React from "react";

// Displays the picture, name, and major of a mentor.
const Mentor = (mentor) => {
    if (!validateMentorData(mentor)) {
        return (<></>);
    } else {
        return (
            <div className="container">
                <h1>{mentor.name}</h1>
                <img width="175px"
                     src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                     alt="profile-pic"/>
                <h2>{mentor.major}</h2>
                <h3>{mentor.subjects}</h3>
            </div>
        )
    }
}

const validateMentorData = (mentor) => {
    return !(mentor === undefined || mentor === null);
    // TODO(johancc) - Implement a more through validation if needed.
}

export default Mentor;