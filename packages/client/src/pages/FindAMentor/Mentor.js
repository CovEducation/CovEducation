import React from 'react';
import styled from 'styled-components';

const BiggerHeader = styled.h1`
    font-size: 4em;
    text-align: center;
    margin: 2px 4px 2px 4px;
`
const BigHeader = styled.h3`
    margin: 1px 0px 5px 0px;
`
const Header = styled.h4`
    margin: 1px 0px 5px 0px;
`
const Image = styled.img`
    display: block;
    object-fit: cover;
    width: 225px;
    height 275px;
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
const Subjects = ({ mentor }) => {
    return (
        <td width="60%">
            <BigHeader>Subjects: </BigHeader>{ mentor.subjects.join(', ') }
        </td>
    );
}
const MajorTags = ({ mentor }) => {
    return (
        <td width="40%">
            <Header>Major: </Header>{ mentor.major } <br/><br/>
            <Header>Tags: </Header>{ mentor.tags.join(', ')}
        </td>
    )
}

// Displays additional data about the mentor
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
                                <h3 align="center">{ mentor.college }</h3>
                            </td>
                        </tr>
                        <br />
                        <tr style={{ wordWrap: true }}>
                            <Subjects mentor={mentor} />
                            <MajorTags mentor={mentor} />
                        </tr>
                        <tr >
                            <td colspan="2" >
                                <Bio mentor={mentor} />
                            </td>
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
