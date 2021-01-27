import React, { useEffect, useState } from 'react'
import { Jutsu } from 'react-jutsu'
import { Auth, Db } from '../../providers/FirebaseProvider/index.js';
import TextField from '@material-ui/core/TextField';
import {FONTS} from '../../constants';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import Container from '@material-ui/core/Container';

const Wrapper = styled.div`
  text-align: center;
`;

  const Title = styled.h1`
  padding-top: 50px;
  font-size: max(1.5vw, 32px);
  font-weight: 400;
  font-family: ${FONTS.font2};
  left: calc(50% - 267px/2 + 0.5px)
  top: 86px
`;

const Subtitle = styled.p`
  font-size: max(1.1vw, 20px);
  font-weight: 500;
  font-style: normal;
  font-family:${FONTS.font2};
`;

const Headings = styled.p`
  font-style: normal;
  font-size: max(1vw, 16px);
  font-weight: 300;
  font-family: ${FONTS.font2};
  text-align: left;
`;

const VideoConferencePage = ({ user }) => {
  const [room, setRoom] = useState('CovEd-hfiaf8932hgWHIG3g028ha')
  const [password, setPassword] = useState('password')
  const [userPassword, setUserPassword] = useState(password)
  const name = user.name
  const [call, setCall] = useState(false)

  const [partnerList, setPartnerList] = useState([])
  const [videoIdList, setVideoIdList] = useState([])
  const [childList, setChildList] = useState([])
   

  useEffect(() => {
    updateMentorList();
  }, []);

  // Creates a list of mentors (if on parent account) or students (if on mentor account) associated with the user
  // Pulls both the IDs and the names of the partners and saves them into lists
  const updateMentorList = async() => {
    const userId = Auth.currentUser.uid;
    let pairCollection = 'mentors';
    let selfSearch = 'mentee'; 

    if (user.role === "MENTOR") {
      pairCollection = 'parents';
      selfSearch = 'mentor'; 
    }

    const pairs = await Db.collection('mentorpairings').where(selfSearch, '==', userId).get();
    const pairIds = []

    pairs.forEach(pair => {
      console.log(pair.id, '=>', pair.data());
      pairIds.push(pair.id)

    });

    const childNames = [] 
    if (user.role === "PARENT"){
      const children = await Db.collection('parents').doc(userId).collection('students').get();
      const childIDs = []
      children.forEach(child => {
        childIDs.push(child.id);
      })
  
      await Promise.all(
        childIDs.map(async id => {
          let childData = await Db.collection('parents').doc(userId).collection('students').doc(id).get();
          childNames.push(childData.data().name);
        })
      )
    }


    const partnerNames = [];
    await Promise.all(
      pairIds.map(async id => {
        let pair = await Db.collection('mentorpairings').doc(id).get();
        let partnerId = pair.data().mentor;
        let other = await Db.collection(pairCollection).doc(partnerId).get(); //parent side

        if (user.role === "MENTOR"){
          partnerId = pair.data().mentee;
          let parentID = pair.data().parent;
          other = await Db.collection(pairCollection).doc(parentID).collection('students').doc(partnerId).get();
        }

        partnerNames.push(other.data().name);
      })
    );

    setPartnerList(partnerNames);
    setVideoIdList(pairIds);
    setChildList(childNames);

    
  }

  const updateRoomConfig = (e) => {
    let mentor = e.target.value;
    setRoom(videoIdList[mentor]);
    setPassword(videoIdList[mentor]);
    setUserPassword(videoIdList[mentor]);
  }

  const handleClick = event => {
    event.preventDefault()
    console.log(partnerList, videoIdList, room, password, userPassword);
    if (room && name && userPassword == password) setCall(true)
  }
  
  return call ? (
    <Jutsu
      roomName={room}
      displayName={name}
      password={userPassword}
      onMeetingEnd={() => console.log('Meeting has ended')}
      loadingComponent={<p>loading ...</p>}
      errorComponent={<p>Oops, something went wrong</p>} 
      containerStyles={{ 
        width: '90%', height: '100%' 
      }}/>
  ) : (
    <Wrapper>
        <Title>{"Start a Meeting"}</Title>
        <Subtitle>{`Select your ${user.role=="MENTOR" ? "mentee" : "mentor"} from the dropdown`}</Subtitle>  <br />
        <Container maxWidth="sm" >
        <form>
            <select id='mentor' placeholder='Mentor Name' onChange={updateRoomConfig}>
              <option value="default">Select One</option>
              {partnerList.map((name, index) => 
                <option value = {index}> {name} </option>
              )}
            </select>
              
            <div>
                <br />
                {`${user.role === "PARENT" ? 
                  <select id='child' placeholder='Child Name' onChange={updateRoomConfig}>
                    <option value="default">Select One</option>
                    {childList.map((name, index) => 
                      <option value = {index}> {name} </option>
                    )}
                  </select>
              
                :
                "" }`}
            </div>

            <br /> <br />
            <Button theme="accent" size="md" onClick={handleClick} type='submit'>
              Join
            </Button>
          </form >
        </Container> <br /><br />
    </Wrapper>
    )
}

export default VideoConferencePage