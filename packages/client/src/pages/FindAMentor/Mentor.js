import React from 'react';
import styled from 'styled-components';

const BiggerHeader = styled.h1`
    font-size: 4em;
`
const BigHeader = styled.h3`
    margin: 1px 0px 5px 0px;
`
const Header = styled.h4`
    margin: 1px 0px 5px 0px;
`
const Image = styled.img`
    max-width: 80%;
    display: block;
`
const PaddedDiv = styled.div`
    margin: 5px 30px 15px 30px;
`

const Bio = ({ mentor }) => {
    return (
        <td>
            <h3>Short Bio:</h3>
            <p>{ mentor.bio }</p>
        </td>
    )
}
const Major = ({ mentor }) => {
    return (
        <td width="60%">
            <BigHeader>Subjects: </BigHeader>{ mentor.subjects.join(', ') }
        </td>
    );
}
const Subjects = ({ mentor }) => {
    return (
        <td width="40%">
            <Header>Major: </Header>{ mentor.major } <br />
            <Header>Tags: </Header>{ mentor.tags.join(', ')}
        </td>
    )
}

// Displays the picture, name, and major of a mentor.
const Mentor = ({ mentor }) => {
    if (!validateMentorData(mentor)) {
        return (<></>);
    } else {
        return (
            <PaddedDiv>
                <table style={{ width: '100%', tableLayout: 'inherit' }}>
                    <tbody>
                        <tr>
                            <td align="center">
                                <Image src={ mentor.avatar }
                                     alt="profile-pic"
                                />
                            </td>
                            <td>
                                <BiggerHeader>
                                    { mentor.name }
                                </BiggerHeader>
                            </td>
                        </tr>
                        <br />
                        <tr style={{ wordWrap: true }}>
                            <Major mentor={mentor} />
                            <Subjects mentor={mentor} />
                        </tr>
                        <tr>
                            <Bio mentor={mentor} />
                        </tr>
                    </tbody>
                </table>
            </PaddedDiv>
        )
    }
}

const validateMentorData = (mentor) => {
    return !(mentor === undefined || mentor === null);
    // TODO(johancc) - Implement a more through validation if needed.
}

export default Mentor;
