import React from 'react';
import HTabs from './Tabs';
import useAuth from "../../providers/AuthProvider";
import styled from 'styled-components';


const TabsContainer = styled.div`
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    text-align: center;
    width: 70%;
    margin: 0 auto;
`

const MeetOurTeam = () => {
  const { teamData } = useAuth();
  const getFilteredData = (type) => {
    if(type !== undefined) {
      const data = teamData && teamData.filter((data) => data.team === type);
      return data;
    }
    else {
      return teamData;
    }
      
  };
  return (
    <div>
        <h1 style={{ textAlign: 'center' }}>Meet Our Team </h1>
        <TabsContainer>
        <HTabs 
        texts={
          [ 
          getFilteredData(),  // All
          getFilteredData('Management'),
          getFilteredData('Coordinators'), 
          getFilteredData('Public Relations'),
          getFilteredData('Outreach'),
          getFilteredData('Speaker Series'),
          getFilteredData('Technology Team')
        ]} 
        labels={['All', 'Management', 'Coordinators', 'Public Relations', 'Outreach', 'Speaker Series', 'Technology Team']} 
        class="process"
        />
      </TabsContainer>
    </div>
  )
}

export default MeetOurTeam;
