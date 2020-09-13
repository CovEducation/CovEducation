import React from 'react';
import styled from 'styled-components';
import FindAMentorPage from '../FindAMentor';
import { COLORS } from '../../constants';
import { Route, Link, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import ProfilePage from '../Profile';
import useAuth from '../../providers/AuthProvider';

const DashboardWrapper = styled.div`
  height: calc(100vh - 64px - 195px); // subtract heights for navbar and footer
  margin-top: 64px; // remove this line once navbar is in

  display: grid;
  grid-template-rows: 200px auto;
  grid-template-columns: 245px auto;
  grid-template-areas:
    "dashboard-header dashboard-header"
    "dashboard-sidenav dashboard-content";
`;

const DashboardHeader = styled.div`
  background-color: ${COLORS.darkblue};
  color: ${COLORS.white};
  padding: 48px 90px;
  grid-area: dashboard-header;
  display: flex;
  align-items: center;

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

const DashboardSidenav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 30px 50px 40px;
  grid-area: dashboard-sidenav;
  background-color: ${COLORS.grey};
`;

const SidenavLink = styled(Link)`
  text-decoration: none;
  color: ${({ active = false }) => active ? COLORS.blue : 'black'};
  font-size: 20px;
  margin-bottom: 25px;
  opacity: ${({ active = false }) => active ? 1 : 0.75};

  &:visited {
    color: ${({ active = false }) => active ? COLORS.blue : 'black'};
  }

  &:hover {
    opacity: 1;
  }
`;

const DashboardContent = styled.div`
  grid-area: dashboard-content;
`;

const DashboardPage = () => {
  const { url, path } = useRouteMatch();
  const location = useLocation();
  console.log(location.pathname);
  console.log(path);

  const user = useAuth();
  console.log(user.user);

  return (
    <DashboardWrapper>
      <DashboardHeader>
        <img src="https://via.placeholder.com/100" alt="profile pic" />
        <div>
          <h1>{user.user.name}</h1>
          <p>Mentee Dashboard</p>
        </div>
      </DashboardHeader>
      <DashboardSidenav>
        <SidenavLink to={`${url}/profile`} active={location.pathname.endsWith('profile')}>My Profile</SidenavLink>
        <SidenavLink to={`${url}/mentors`} active={location.pathname.endsWith('mentors')}>Find a Mentor</SidenavLink>
        <SidenavLink to={`${url}/speaker-series`} active={location.pathname.endsWith('speaker-series')}>Speaker Series</SidenavLink>
        <SidenavLink to={`${url}/requests`} active={location.pathname.endsWith('requests')}>Requests</SidenavLink>
      </DashboardSidenav>
      <DashboardContent>
        <Route path={`${path}/profile`} exact>
          <ProfilePage />
        </Route>
        <Route path={`${path}/mentors`} exact>
          <FindAMentorPage />
        </Route>
        <Route path={path}>
          <Redirect to={`${url}/profile`} />
        </Route>
      </DashboardContent>
    </DashboardWrapper>
  )
}

export default DashboardPage;
