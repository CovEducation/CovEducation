import React from 'react';
import HTabs from '../../components/Tabs';

const MeetOurTeam = () => {

  return (
    <div>
        <h1 style={{ textAlign: 'center' }}>Meet Our Team </h1>
        <HTabs texts={['text1', 'text2', 'text3']} labels={['All', 'Management', 'Coordinators', 'Public Relations', 'Outreach', 'Speaker Series', 'Technology Team']} class="process"/>

    </div>
  )
}

export default MeetOurTeam;
