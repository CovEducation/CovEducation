import React, { useState } from 'react';
import { get } from '../../utilities.js';
import MentorFilters from './MentorFilters';
import MentorColumn from './MentorColumn';
import styled from 'styled-components';
import useAuth from '../../providers/AuthProvider';

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

    const { user } = useAuth();
    const { tags, setTags } = useState([]);
    const { subjects, setSubjects } = useState([]);

    // Lazily initialize the filter settings
    const [filters, setFilters] = useState({
        'gradeLevel': {},
        'subject': {},
        'specialNeeds': {},
    });
    const handleMentorshipRequest = (event) => {
        // TODO(johanc): Implement.

    };

    const openModal = (mentor) => {
        // TODO(johanc): Implement.
    }

    const handleFilterChange = (filterCategory, change) => {
        console.log(filterCategory, change);
        if (filters[filterCategory]) {
            const currentCategoryFilters = filters[filterCategory];
            setFilters({
                ...filters,
                [filterCategory]: {
                    ...currentCategoryFilters,
                    [change.name]: change.checked
                }
            })
        }
    }

    return (
        <FindAMentorWrapper>
            <FindAMentorSidebarWrapper>
                <MentorFilters onChange={handleFilterChange} />
            </FindAMentorSidebarWrapper>
            <FindAMentorMainWrapper>
                <MentorColumn/>
            </FindAMentorMainWrapper>
        </FindAMentorWrapper>
    )
}


export default FindAMentorPage;
