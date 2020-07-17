import React from 'react';
import Modal from '../../components/Modal';
import MentorProfile from '../FindAMentor/MentorProfile';

const mentor = {
    "_id" : "5ee15af7e790bd0a065b70f9",
    "subjects" : ["Physics", "Math"],
    "location" : "Cambridge, MA",
    "languages_spoken" : ["Spanish", "English", "Mandarin", "German"],
    "grade_levels_to_mentor" : ["Middle School", "High School"],
    "mentees" : [],
    "tags" : [],
    "firebase_uid" : "sNku1aj94rZz0fLYwFwW2qhvdFI3",
    "name" : "Maria Mentor",
    "email" : "mariamentor@coved.org",
    "timezone" : "Central Daylight Time - Chicago (GMT-5)",
    "bio" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim vulputate pretium. Mauris aliquam eleifend porttitor. Sed id lectus in libero scelerisque congue. Ut tincidunt bibendum neque, eget sodales erat molestie vel. Donec eu fermentum ex, id ultricies odio. Aliquam massa tortor, ornare at dignissim quis, suscipit eu urna. Sed iaculis magna quis sapien eleifend, vitae pretium neque auctor. Cras a risus id turpis rutrum commodo eu sed leo. Donec tempor erat tortor, vel aliquam nisl molestie et. Donec facilisis lobortis metus et malesuada. Morbi a nunc vitae risus sagittis eleifend et finibus eros. Maecenas sit amet ante nec ante placerat eleifend non at purus. Nulla eu tempor justo.",
    "major" : "Computer Science",
    "last_request" : "2020-06-10T22:13:11.769Z",
    "public" : true,
    "__v" : 0
};

const ProfilePage = () => {
    return (
        // <div>Profile page</div>
        <Modal>
            <MentorProfile mentor={mentor} />
        </Modal>
    )
}

export default ProfilePage;
