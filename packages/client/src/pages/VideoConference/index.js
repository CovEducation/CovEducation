import React, { useEffect, useState } from 'react'
import { Jutsu } from 'react-jutsu'
import { Auth, Db } from '../../providers/FirebaseProvider/index.js';

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
    setVideoIdList(pairIds.map(id => id + userId));
    
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
      errorComponent={<p>Oops, something went wrong</p>} />
  ) : (
      <form>
        <select id='mentor' placeholder='Mentor Name' onChange={updateRoomConfig}>
          <option value="default">Select One</option>
          {partnerList.map((name, index) => 
            <option value = {index}> {name} </option>
          )}
        </select>
        <button onClick={handleClick} type='submit'>
          Start / Join
      </button>
      </form >
    )
}

export default VideoConferencePage