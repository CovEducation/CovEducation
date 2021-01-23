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
   

  useEffect(() => {
    updateMentorList();
  }, []);

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

      let partnerId = pair.data().mentor;
      if (user.role === "MENTOR"){
        partnerId = pair.data().mentee;
      }
      pairIds.push(partnerId)
    });

    const partnerNames = [];
    await Promise.all(
      pairIds.map(async id => {
        console.log(id, pairCollection);
        let other = await Db.collection(pairCollection).doc(id).get();
        partnerNames.push(other.data().name);
      })
    );



    console.log(partnerNames);
    setPartnerList(partnerNames);
    setVideoIdList(pairIds.map(id => {
      let videoId = id + userId;
      if (user.role === "MENTOR"){
        videoId = userId + id;
      }
      return videoId;
    }));
    
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