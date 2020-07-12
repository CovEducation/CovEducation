import React, { useState } from 'react';
import useAuth from "../../providers/AuthProvider";
import { get } from "../../utilities.js";

import Mentor from "./Mentor.js";
import Modal from "../../components/Modal";

// Purpose:
//      Display a list of available mentors to parents and send mentorship requests.
// Visibility:
//      Authentication required.
const FindAMentorPage = () => {
    // Semantic breakdown:
    //     There are two main subcomponents: A column with filters and column displaying
    //     the mentor results. The tags set by the user should propagate to the mentorship
    //     column - the only shared state component.

    const { user } = useAuth();
    const { tags, setTags } = useState([]);
    const { subjects, setSubjects} = useState([]);
    const handleMentorshipRequest = (event) => {
        // TODO(johanc): Implement.
        
    };

    const openModal = (mentor) => {
        // TODO(johanc): Implement.
    }
    const FilterColumn = () => {
        // TODO: Implement - should use setTags() to update the state.
        <a onClick={() => setTags([])}>Placeholder filter component.</a>
    };

    const mentors = await get("/api/mentors", {tags: tags, subjects: subjects});
    const MentorColumn = () => {
        // A grid of mentor components.
        return (
            <>
                {mentors.map((mentor) =>
                    (<Modal text={mentor.name} title={mentor.name} trigger={<Mentor mentor={mentor}/>}>
                        <MentorRequestFrame mentor={mentor}/>
                    </Modal>))}
            </>
        )
    }

    return (
        <>
            <div className="container">
                <div className="col-md-4">
                    <FilterColumn/>
                </div>
                <div className="col-md-8">
                    <MentorColumn/>
                </div>
            </div>  
        </>
    )
}


export default FindAMentorPage;