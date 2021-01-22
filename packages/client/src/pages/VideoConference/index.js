import React, { useState } from 'react'

import { Jutsu } from 'react-jutsu'

const VideoConferencePage = () => {
  const [room, setRoom] = useState('CovEd-hfiaf8932hgWHIG3g028ha')
  const [password, setPassword] = useState('password')
  const [userPassword, setUserPassword] = useState(password)
  const [mentor, setMentor] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)

  const handleClick = event => {
    event.preventDefault()
    if (room && name && mentor && userPassword == password) setCall(true)
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
        <input id='name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <select id='mentor' placeholder='Mentor Name' value={mentor} onChange={(e) => setMentor(e.target.value)}>
          <option value="default">Select One</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
        <button onClick={handleClick} type='submit'>
          Start / Join
      </button>
      </form >
    )
}

export default VideoConferencePage