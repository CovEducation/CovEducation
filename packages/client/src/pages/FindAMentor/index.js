import React from 'react';
import styled from 'styled-components';

import Mentor from './Mentor';
import MentorFilters from './MentorFilters';
import MentorRequestFrame from './MentorRequestFrame';
import Modal from '../../components/Modal';
// import useAuth from '../../providers/AuthProvider';

const FindAMentorWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-areas: "sidebar main main";

    // remove the following lines after we have the rest of dashboard built.
    // these are just to make it look approximately like mockups
    margin-top: 300px;
    margin-left: 400px;
`;

const FindAMentorSidebarWrapper = styled.div`
    grid-area: sidebar;
`;

const FindAMentorMainWrapper = styled.div`
    grid-area: main;
`;

// Purpose:
//      Display a list of available mentors to parents and send mentorship requests.
// Visibility:
//      Authentication required.
const FindAMentorPage = () => {
    // Semantic breakdown:
    //     There are two main subcomponents: A column with filters and column displaying
    //     the mentor results. The tags set by the user should propagate to the mentorship
    //     column - the only shared state component.

    // const { user } = useAuth();
    // const { tags, setTags } = useState([]);
    // const { subjects, setSubjects } = useState([]);
    // const handleMentorshipRequest = (event) => {
    //     // TODO(johanc): Implement.
    // };
    //
    // const openModal = (mentor) => {
    //     // TODO(johanc): Implement.
    // }
    // const FilterColumn = () => {
    //     // TODO: Implement - should use setTags() to update the state.
    //     return <a onClick={() => setTags([])}>Placeholder filter component.</a>
    // };

    const mentors = [];
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
        <FindAMentorWrapper>
            <FindAMentorSidebarWrapper>
                <MentorFilters />
            </FindAMentorSidebarWrapper>
            <FindAMentorMainWrapper>
                <MentorColumn/>
            </FindAMentorMainWrapper>
        </FindAMentorWrapper>
    )
}


export default FindAMentorPage;
