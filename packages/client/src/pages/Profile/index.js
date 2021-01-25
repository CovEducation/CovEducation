import React from 'react';
import styled from 'styled-components';

const ProfilePageWrapper = styled.div`
  padding: 100px;
  h2 {
    margin: 0px 0px 10px;
  }
`;

const ProfileHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  p{
    margin-block-start: 10px;
    margin-block-end: 10px;
  }
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  margin-right: 50px;
`;

const ProfileDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  gap: 20px 100px;
  p {
    margin-block-start: 10px;
    margin-block-end: 10px;
  }
`;

const MentorProfileDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  gap: 20px 100px;
`;

const StudentListGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  gap: 50px 100px;
  p {
    margin-block-start: 10px;
    margin-block-end: 10px;
  }
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
      <p><b>{header}</b></p>
      <p>{valueParsed}</p>
    </div>
  )
}

const StudentDetailItem = ({ name, gradeLevel, subjects }) => {
  let subjectsList = subjects;
  if (subjects instanceof Array) {
    subjectsList = subjects.join(', ');
  }
  return (
    <div>
      <p><b>{name}</b></p>
      {gradeLevel && <p><b>Gradelevel</b> : {gradeLevel}</p> }
      {subjectsList.length > 0  && <p><b>Subjects</b> : {subjectsList}</p> }
    </div>
  )
}

const ProfilePage = ({ user }) => {
  return (
    <ProfilePageWrapper>
      <ProfileHeaderWrapper>
        <ProfilePicture src="https://via.placeholder.com/115" alt="profile pic" />
        <div>
          <p><b>{ user.name }</b></p>
          <p>{ user.email }</p>
          <p>{ user.phone }</p>
        </div>
      </ProfileHeaderWrapper>
      {user.role === "PARENT" ? (
      <ProfileDetailsGrid>
          <ProfileDetailItem header="Location" value={user.timezone} />
          <ProfileDetailItem header="Notification Preference" value="Phone/Email" />
        </ProfileDetailsGrid>   
      ) : (
        <MentorProfileDetailsGrid>
        <ProfileDetailItem header="Subjects" value={user.subjects} />
        <ProfileDetailItem header="Grade Level" value={MOCK_PROFILE_DATA.grade} />
        <ProfileDetailItem header="Languages" value={MOCK_PROFILE_DATA.languages} />
        <ProfileDetailItem header="Location" value={MOCK_PROFILE_DATA.location} />
        <ProfileDetailItem header="Time Zone" value={user.timezone} />
        <ProfileDetailItem header="Email" value={user.email} />
        </MentorProfileDetailsGrid>
      )}

      {user.role === "PARENT" && (
        <>
        { user.students.length > 0 &&
        <>
        <h2>STUDENTS</h2>
        <StudentListGrid>
          { user.students.map((student,index) => 
             <StudentDetailItem key={index} name={student.name} gradeLevel={student.gradeLevel} subjects={student.subjects}/>
          )}
        </StudentListGrid>
        </>
        }
        </>
      )}
      

    </ProfilePageWrapper>
  )
}

export default ProfilePage;
