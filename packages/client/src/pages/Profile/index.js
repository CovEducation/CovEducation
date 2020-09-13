import React from 'react';
import styled from 'styled-components';
import useAuth from '../../providers/AuthProvider';

const ProfilePageWrapper = styled.div`
  padding: 100px;
`;

const ProfileHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const StudentHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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

const ProfilePage = () => {
  const user = useAuth();

  return (
    <ProfilePageWrapper>
      <ProfileHeaderWrapper>
        <ProfilePicture src="https://via.placeholder.com/115" alt="profile pic" />
        <div>
          <h2>{user.user.name}</h2>
          <p>Beverly High School</p>
          <p>9th Grade</p>
        </div>
      </ProfileHeaderWrapper>
      <ProfileDetailsGrid>
        <ProfileDetailItem header="Time Zone" value={user.user.timezone} />
        <ProfileDetailItem header="Email" value={user.user.email} />
      </ProfileDetailsGrid>
      {user.user.students.map((student) => <>
        <StudentHeaderWrapper>
          <div>
            <h2>{student.name}</h2>
            <p>{student.gradeLevel}</p>
          </div>
        </StudentHeaderWrapper>
        <ProfileDetailsGrid>
          <ProfileDetailItem header="Subjects" value={student.subjects} />
          <ProfileDetailItem header="Email" value={student.email} />
        </ProfileDetailsGrid> </>
      )}
    </ProfilePageWrapper>
  )
}

export default ProfilePage;
