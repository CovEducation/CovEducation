import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { TERMSCONDITIONS, COLORS } from '../../constants.js';

const TermCondwrapper = styled.div`
  text-align: center;
`;

const TermCondSection = styled.section`
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
  padding: 20%;
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
  ${'' /* border-color: ${COLORS.yellow}; */}
  background-color: ${COLORS.yellow};
  ${'' /* border-width: 3px; */}
`;

const TermCondTitle = styled.h4`
  font-size: 28px;
  font-family: Montserrat, sans-serif;
  padding-bottom: 2px;
  padding-top: 10px;
  margin: 0;
  font-weight: normal;
`;

const TermCondBody = styled.p`
  font-size: 18px;
  line-height: 25px;
  font-family: Muli, sans-serif;
  width: 100%;

  a {
    font-color: ${COLORS.yellow};
  }
`;

const TermsAndConditions = () => {
  return (
    // <wrapper>
    <TermCondSection>
      <br />
      <PageTitle>CovEd Terms and Conditions</PageTitle>
      <PageSubTitle><b>Last Modified:</b> April 23, 2020</PageSubTitle>
      <Line style={{width: '200px'}}/>
      <br />
      <br />
        {TERMSCONDITIONS.map((termcondition) => {
          return(
            <Box style={{width: '100%'}}>
            <TermCondTitle>
              {termcondition.num + ". " + termcondition.title}
            </TermCondTitle>
            <TermCondBody>
              {termcondition.body}
            </TermCondBody>
          </Box>
          )})}
    </TermCondSection>
    // </wrapper>
  )
}

export default TermsAndConditions;
