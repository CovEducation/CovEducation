import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { PRIVACY, COLORS } from '../../constants.js';

const PrivacySection = styled.section`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 90vh;
  position: relative;
  overflow: hidden;
`;

const PageTitle = styled.h1`
  font-size: 45px;
  margin: 0;
  color: ${COLORS.darkblue};
  font-family: Montserrat, sans-serif;
  padding: 12px;
  font-weight: normal;
`;

const PageSubTitle = styled.h1`
  font-size: 12px;
  margin: 0;
  color: ${COLORS.darkblue};
  font-family: Montserrat, sans-serif;
  font-weight: normal;
`;

const Line = styled.hr`
  max-width: 200px;
  height: 2px;
  border-color: transparent;
  background-color: ${COLORS.yellow};
  border-width: 1px;
`;

const PrivacyTitle = styled.h4`
  font-size: 28px;
  font-family: Montserrat, sans-serif;
  padding-bottom: 2px;
  padding-top: 10px;
  margin: 0;
  font-weight: normal;
`;

const PrivacyBody = styled.p`
  font-size: 18px;
  line-height: 25px;
  font-family: Muli, sans-serif;
  width: 100%;
  }
`;

const PrivacySubSecTitle = styled.h4`
  font-size: 24px;
  font-family: Montserrat, sans-serif;
  padding-bottom: 2px;
  padding-top: 10px;
  margin: 0;
  font-weight: normal;
`;


const Privacy = () => {
  return (
    // <>
    <PrivacySection>
      <PageTitle>Privacy Policy</PageTitle>
      <PageSubTitle><b>Last Modified:</b> April 23, 2020</PageSubTitle>
      <Line style={{width: '200px'}}/>
      <br />
        {PRIVACY.map((privacy) => {
          var body;
          if (privacy.subsection){
            var subsection;
            subsection = privacy.subsection.map((sec) => {
              return(
                <Box><PrivacySubSecTitle>{privacy.num +'.'+sec.num+'. '+sec.title}</PrivacySubSecTitle>
                <PrivacyBody>{sec.body}</PrivacyBody></Box>
              )
            })
            body = <>
              <PrivacyBody>{privacy.body}</PrivacyBody>
              <>{subsection}</>
            </>;
          } else{
            body = <PrivacyBody>{privacy.body}</PrivacyBody>
          }
          return(
            <Box style={{width: '100%'}}>
            <PrivacyTitle>
              {privacy.num + ". " + privacy.title}
            </PrivacyTitle>
            {body}
          </Box>
          )
        })}
    </PrivacySection>
    // </>
  )
}

export default Privacy;
