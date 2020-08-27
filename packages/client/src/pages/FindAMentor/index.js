import React, { useState } from 'react';
import MentorFilters from './MentorFilters';
import MentorGrid from './MentorGrid';
import styled from 'styled-components';

const FindAMentorWrapper = styled.div`
    display: grid;
    grid-template-columns: 200px auto;
    grid-template-areas: "sidebar main";
`;

const FindAMentorSidebarWrapper = styled.div`
    grid-area: sidebar;

    h2 {
        font-weight: normal;
        font-size: 18px;
        padding-left: 15px;
    }
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

    // Lazily initialize the filter settings
    const [filters, setFilters] = useState({
        'gradeLevel': {},
        'subject': {},
        'specialNeeds': {},
    });

    const handleFilterChange = (filterCategory, change) => {
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
                <h2>Filter By</h2>
                <MentorFilters onChange={handleFilterChange} />
            </FindAMentorSidebarWrapper>
            <FindAMentorMainWrapper>
                <MentorGrid/>
            </FindAMentorMainWrapper>
        </FindAMentorWrapper>
    )
}


export default FindAMentorPage;
