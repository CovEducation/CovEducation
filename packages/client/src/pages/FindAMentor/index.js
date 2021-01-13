import React from 'react';
import MentorSearch from './MentorSearch';
import styled from 'styled-components';
// import useAuth from '../../providers/AuthProvider';

const FindAMentorWrapper = styled.div`
    // display: grid;
    // width: 100%,
    // grid-template-columns: 200px auto;
    // grid-template-areas: "main";
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

    return (
        <MentorSearch/>
    )
}


export default FindAMentorPage;