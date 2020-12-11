import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import Button from '../../components/Button';
import useAuth, { AUTH_STATES } from "../../providers/AuthProvider";


const RequestsPageWrapper = styled.div`
  padding: 100px;
`;
const RequestsHeader = styled.div`
  padding-bottom: 48px;
  display: block;
  align-items: center;
  margin: 0 auto;
  text-align: center;

  div {
    align-items: center;
    margin: 0 auto;
  }

  img {
    border-radius: 50%;
    margin-right: 50px;
  }

  h1 {
    font-size: 45px;
    margin: 0;
  }

  p {
    font-size: 24px;
    margin: 0;
  }
`;
const RequestsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;
const RequestDetailsBlock = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  p {
    font-size: 24px;
  }
  span {
    color:${COLORS.blue};
    border-bottom : 2px solid;
  }
`;

const UserPicture = styled.img`
  margin-right: 50px;
`;

const RequestsDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-rows: 60px 60px 60px;
  gap: 20px 100px;
`;

const RequestsPage = ({ user }) => {
  const { getUserDataByEmail } = useAuth();
  const [serverError, setServerError] = useState(false);

  const handleSubmit = () => {
    console.log("signed in",user.email);
    getUserDataByEmail(user.email)
        .then(() => console.log("signed in"))
        .catch(() => setServerError(true));
}


  return (
    <RequestsPageWrapper>
      <RequestsHeader>
        <div>
          <h1>Pending Requests</h1>
        </div>
      </RequestsHeader>
      <RequestsWrapper>
        <UserPicture src="https://via.placeholder.com/115" alt="profile pic" />
        <div>
          <p> { user.name } </p>
          <p>{ user.timezone }</p>
          <p>Subjects</p>
          <p>9th Grade</p>
        </div>
        <RequestDetailsBlock>
        <div>
          <p>Date Requested:</p>
          <p><span>01/01/2020</span></p>
          <p>status: <span>Pending</span></p>
        </div>
        </RequestDetailsBlock>
        <RequestDetailsBlock>
          <Button theme='accent' size='md' onClick={handleSubmit}> Accept </Button>
        </RequestDetailsBlock>
      </RequestsWrapper>
    </RequestsPageWrapper>
  )
}

export default RequestsPage;
