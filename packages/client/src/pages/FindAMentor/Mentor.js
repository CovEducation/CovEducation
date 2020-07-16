import React from "react";
import './mentor.scss'

// Displays the picture, name, and major of a mentor.
const Mentor = ({ mentor }) => {
    if (!validateMentorData(mentor)) return (<></>);

    const relevantInformation = [
        ["subjects", "Subjects"],
        ["location", "Location"],
        ["grade_levels_to_mentor", "Grades"],
        ["timezone", "Timezone"],
        ["languages_spoken", "Languages"],
        ["email", "Email"]
    ];
    
    return (
        <div className="mentor-card-container">
            <div className="mentor-card">
                <img src={mentor.avatar} alt="Profile picture" />
                <div>
                    <h3>{mentor.name}</h3>
                    <h4>{mentor.school}</h4>
                    <h4>{mentor.major}</h4>
                </div>
            </div>
            {mentor.bio !== null &&
                <div>
                    <p>Bio</p>
                    <p>{mentor.bio}</p>
                </div>
            }
            <div className="mentor-information">
                {relevantInformation.map(field => displayField(field, mentor))}
            </div>
        </div>
    )
}

const validateMentorData = (mentor) => {
    if (mentor === undefined || mentor === null) return false;
    // TODO(johancc) - Implement a more through validation if needed.
    return true;
}

const displayField = (field, mentor) => {
    let mentorInfo = mentor[field[0]];
    if (Array.isArray(mentorInfo)) {
        mentorInfo = mentorInfo.join(", ");
    }
    return (
        <div>
            <p>{field[1]}</p>
            <p>{mentorInfo}</p>
        </div>
    )
};

export default Mentor;