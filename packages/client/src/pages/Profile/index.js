import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import ParentEditForm from '../../pages/EditProfile/parentForm';
import ParentChildForm from '../../pages/EditProfile/parentChildForm';
import { Auth } from '../../providers/FirebaseProvider';
import useAuth from "../../providers/AuthProvider";
import MentorStep2 from '../SignUp/wizards/MentorWizard/forms/MentorStep2.js';
import MentorStep3 from '../SignUp/wizards/MentorWizard/forms/MentorStep3.js';


const SignUpChildWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    max-width: calc(700px - 4em);
    min-width: calc(400px - 4em);
    padding: 2em;
    color: black;
    button {
      width: 100%;
      margin: 0px 0px 20px 0px;
    }
`;

const ChildSignUpButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;


const ProfilePageWrapper = styled.div`
  padding: 100px;
  h2 {
    margin: 15px 0px 10px;
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

const StudentChildDiv = styled.div`
  display: block;
  button {
    width: 100%;
    margin: 0px 0px 20px 0px;
  }
`;

const MentorProfileDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  gap: 5px 100px;
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

const ButtonBlock = styled.div`
  padding: 0em 2em 2em 2em;
  button {
    width: 100%;
    margin: 0;
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
      <>
      {valueParsed && 
      <div>
        <p><b>{header}</b></p>
        <p>{valueParsed}</p> 
       
      </div>
      }
      </>
    )
  }
 

const StudentDetailItem = ({ name, gradeLevel, subjects }) => {
  let subjectsList = subjects;
  if (subjects instanceof Array) {
    subjectsList = subjects.join(', ');
  }
  return (
    <div>
      <p><b>Name : {name}</b></p>
      {gradeLevel && <p><b>Gradelevel</b> : {gradeLevel}</p> }
      {subjectsList.length > 0  && <p><b>Subjects</b> : {subjectsList}</p> }
    </div>
  )
}


const ProfilePage = ({ user }) => {

  const { saveProfileDetails, setUserData } = useAuth();

  let parentWizardSignUpData = {

    //Page 2
    parentPronouns: user.pronouns,
    parentName: user.name,
    parentEmail: user.email,
    parentPhoneNumber: user.phone,
    timeZone: user.timezone,
    notificationPreference: user.notificationPreference?user.notificationPreference:"phone",
  
    // Page 3
    registeredChildren: user.students,
  
  
  };

  
  
  const updateParentWizardSignUpData = (data) => {
    parentWizardSignUpData = { ...parentWizardSignUpData, ...data };
  }

  const updateRegisteredChild = (index, data) => {
    let childRegistrationInfo = parentWizardSignUpData.registeredChildren[index];
    let mergedChildRegistration = { ...childRegistrationInfo, ...data };
    parentWizardSignUpData.registeredChildren[index] = mergedChildRegistration;
  }

  const SecondPage = () => {

    const [state, setState] = useState({});
  
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        console.log(event.target.value);
        updateParentWizardSignUpData({ [event.target.name]: event.target.value });
    };
  
    return (
        <SignUpChildWrapper>
            <ParentEditForm data={parentWizardSignUpData} handleChange={handleChange} />
        </SignUpChildWrapper>
    );
  }

  const ThirdPage = () => {

    const [state, setState] = useState({});

    const updateRegisteredChild = (index, data) => {
      let childRegistrationInfo = parentWizardSignUpData.registeredChildren[index];
      let mergedChildRegistration = { ...childRegistrationInfo, ...data };
      parentWizardSignUpData.registeredChildren[index] = mergedChildRegistration;
    }

    const handleAddClick = (event) => {
      event.preventDefault();
      parentWizardSignUpData.registeredChildren.push({
        subjects: [],
        gradeLevel: '',
        newStudent: 1
      });
      setState({ ...state });
    }

    const handleRemoveClick = (event, data) => {
        event.preventDefault();
        //console.log(event.target.dataset);
        //const { index } = event.target.dataset;
        //console.log(data);
        delete parentWizardSignUpData.registeredChildren[data];
        //parentWizardSignUpData.registeredChildren.pop();
        setState({ ...state });
    }

    let children = parentWizardSignUpData.registeredChildren.map((item, index) => {
      if(typeof item.newStudent !== "undefined")
      {
        if(item.newStudent)
        {
          return (
            <StudentChildDiv>
              <ParentChildForm key={index} index={index} data={parentWizardSignUpData} updateRegisteredChild={updateRegisteredChild} newStudent={true}/>
              <Button onClick={(e) => handleRemoveClick(e, index)} data-index={index}>
                  Remove Student
              </Button>
            </StudentChildDiv>
          )
        }
      }
      return (
        <StudentChildDiv>
          <ParentChildForm key={index} index={index} data={parentWizardSignUpData} updateRegisteredChild={updateRegisteredChild} newStudent={false}/>
        </StudentChildDiv>
      )
    });

    



    //const showRemoveChildButton = parentWizardSignUpData.registeredChildren.length > 1;

    return (
        <SignUpChildWrapper>
            {children}
            <ChildSignUpButtonWrapper>
                <Button onClick={handleAddClick}>
                  Add Student
                </Button>
            </ChildSignUpButtonWrapper>
        </SignUpChildWrapper>
    );
  }
  let mentorWizardSignUpData = {
    mentorName: user.name,
    mentorEmail: user.email,
    selectedGradeLevels: user.gradeLevels?user.gradeLevels:[],
    selectedSubjects: user.subjects,
    notificationPreference: user.notificationPreference?user.notificationPreference:"phone",
    major: user.major,
    introduction: user.bio,
    pronouns: user.pronouns
  };

  const updateMentorWizardSignUpData = (data) => {

      mentorWizardSignUpData = { ...mentorWizardSignUpData, ...data };
  }

  const SecondPageMentor = () => {
    
      const [state, setState] = useState({});

      const handleChange = (event) => {
          setState({ ...state, [event.target.name]: event.target.value });
          updateMentorWizardSignUpData({ ...state, [event.target.name]: event.target.value });
      }

      return (
        <SignUpChildWrapper>
          <MentorStep2 data={mentorWizardSignUpData} handleChange={handleChange} />
        </SignUpChildWrapper>  
      );
  }

  const ThirdPageMentor = () => {

      const [state, setState] = useState({
          selectedGradeLevels: mentorWizardSignUpData.selectedGradeLevels ?? [],
          selectedSubjects: mentorWizardSignUpData.selectedSubjects ?? [],
      });

      const { selectedGradeLevels, selectedSubjects } = state;

      const handleChange = (event) => {
          setState({ ...state, [event.target.name]: event.target.value });
          updateMentorWizardSignUpData({ [event.target.name]: event.target.value });
      };

      return (
        <SignUpChildWrapper>
          <MentorStep3 data={mentorWizardSignUpData} handleChange={handleChange} selectedGradeLevels={selectedGradeLevels} selectedSubjects={selectedSubjects} />
          </SignUpChildWrapper>
      );
  }

  const handleSaveProfile = async() => {
    var currentLoggedInUserId = (Auth.currentUser.uid);
    
    if(user.role === "MENTOR")
    {
      var dataToSave = mentorWizardSignUpData;
    }
    else {
      var dataToSave = parentWizardSignUpData;
    }
    var a = await saveProfileDetails(currentLoggedInUserId,dataToSave)
    .then((data) => {
        //setUserData(data);
        document.getElementById("modalCloseButtons").click();
    })
    .catch((err) => {
        console.log(`Error saving profile: ${err}`);
    });
    console.log(a);
  };
  
  const editUserButton = (
    <>
      <Modal
            title="Edit Profile"
            trigger={
              <Button size='sm'> Edit Profile </Button>}
        >
          {user.role === "PARENT" && 
            <div>
              <SecondPage/>
              <ThirdPage/>
              <ButtonBlock>
                <Button theme="accent" onClick={handleSaveProfile}>Save Profile</Button>
              </ButtonBlock>
            </div>
          }

          {user.role === "MENTOR" && 
            <div>
              <SecondPageMentor />
              <ThirdPageMentor />
              <ButtonBlock>
                <Button theme="accent" onClick={handleSaveProfile}>Save Profile</Button>
              </ButtonBlock>
            </div>
          }
      </Modal>
    </>
  );

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <ProfilePageWrapper>
      <ProfileHeaderWrapper>
        <ProfilePicture src="https://via.placeholder.com/115" alt="profile pic" />
        <div>
          <p><b>{ user.name }</b></p>
          <p>{ user.email }</p>
          <p>{ user.phone }</p>
          <p>{editUserButton}</p>
        </div>
      </ProfileHeaderWrapper>
      {user.role === "PARENT" ? (
      <ProfileDetailsGrid>
          <ProfileDetailItem header="Location" value={user.timezone} />
          <ProfileDetailItem header="Notification Preference" value={capitalize(user.notificationPreference)} />
        </ProfileDetailsGrid>   
      ) : (
        <MentorProfileDetailsGrid>
        <ProfileDetailItem header="Subjects" value={user.subjects} />
        <ProfileDetailItem header="Grade Level" value={MOCK_PROFILE_DATA.grade} />
        <ProfileDetailItem header="Languages" value={MOCK_PROFILE_DATA.languages} />
        <ProfileDetailItem header="Location" value={MOCK_PROFILE_DATA.location} />
        <ProfileDetailItem header="Time Zone" value={user.timezone} />
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
