import React, { useState } from 'react';
import Jitsi from 'react-jitsi';


const VideoConferencePage = () => {

  const [displayName, setDisplayName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [onCall, setOnCall] = useState(false)

  return onCall
    ? (
      <Jitsi
        roomName={roomName}
        displayName={displayName}
        password={password}
        onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
      />)
    : (
      <>
        <h1>Create a Meeting</h1>
        <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
        <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
      </>
    )

}

export default VideoConferencePage;