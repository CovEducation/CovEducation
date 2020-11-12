import React from 'react';
import styled from 'styled-components';

const ProfilePageWrapper = styled.div`
  padding: 100px;
`;

const ProfileHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  margin-right: 50px;
`;

const ProfileDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-rows: 60px 60px 60px;
  gap: 20px 100px;
`;

const MOCK_PROFILE_DATA = {
  subjects: ['AP World History', 'AP Psychology'],
  grade: 'High School',
  languages: ['English', 'Spanish'],
  location: 'Los Angeles, California',
  timezone: 'Pacific Standard Time (GMT -08:00)',
  email: 'sallystudent@gmail.com'
}

const ProfileDetailItem = ({ header, value }) => {
  let valueParsed = value;
  if (value instanceof Array) {
    valueParsed = value.join(', ');
  }
  return (
    <div>
      <p>{header}</p>
      <p>{valueParsed}</p>
    </div>
  )
}

const ProfilePage = ({ user }) => {
  return (
    <ProfilePageWrapper>
      <ProfileHeaderWrapper>
        <ProfilePicture src="https://via.placeholder.com/115" alt="profile pic" />
        <div>
          <h2> { user.name } </h2>
          <p>Beverly High School</p>
          <p>9th Grade</p>
        </div>
      </ProfileHeaderWrapper>
      <ProfileDetailsGrid>
        <ProfileDetailItem header="Subjects" value={user.subjects} />
        <ProfileDetailItem header="Grade Level" value={MOCK_PROFILE_DATA.grade} />
        <ProfileDetailItem header="Languages" value={MOCK_PROFILE_DATA.languages} />
        <ProfileDetailItem header="Location" value={MOCK_PROFILE_DATA.location} />
        <ProfileDetailItem header="Time Zone" value={user.timezone} />
        <ProfileDetailItem header="Email" value={user.email} />
      </ProfileDetailsGrid>
    </ProfilePageWrapper>
  )
}

export default ProfilePage;
