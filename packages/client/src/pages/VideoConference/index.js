import React, { useEffect, useState } from 'react'
import { Jutsu } from 'react-jutsu'
import { Auth, Db } from '../../providers/FirebaseProvider/index.js';

const VideoConferencePage = ({ user }) => {
  const [room, setRoom] = useState('CovEd-hfiaf8932hgWHIG3g028ha')
  const [password, setPassword] = useState('password')
  const [userPassword, setUserPassword] = useState(password)
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)

  const [mentorList, setMentorList] = useState([])
  const [videoIdList, setVideoIdList] = useState([])
   

  useEffect(() => {
    updateMentorList();
  }, []);

  const updateMentorList = async() => {
    const userId = Auth.currentUser.uid;
    const userName = user.name;
    setName(userName);

    const pairs = await Db.collection('mentorpairings').where('mentee', '==', userId).get();
    const mentorIds = []

    pairs.forEach(pair => {
      console.log(pair.id, '=>', pair.data());
      let mentorId = pair.data().mentor;
      mentorIds.push(mentorId)
    });

    const mentorNames = [];
    await Promise.all(
      mentorIds.map(async id => {
        console.log(id);
        let mentor = await Db.collection('mentors').doc(id).get();
        mentorNames.push(mentor.data().name);
      })
    );

    console.log(mentorNames);
    setMentorList(mentorNames);
    setVideoIdList(mentorIds.map(id => id + userId));
    
  }

  const updateRoomConfig = (e) => {
    let mentor = e.target.value;
    setRoom(videoIdList[mentor]);
    setPassword(videoIdList[mentor]);
    setUserPassword(videoIdList[mentor]);
  }

  const handleClick = event => {
    event.preventDefault()
    console.log(mentorList, videoIdList, room, password, userPassword);
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
          {mentorList.map((name, index) => 
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