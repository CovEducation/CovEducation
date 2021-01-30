import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS, FONTS } from '../../constants';
import ArrowDown from '../Icons/ArrowDown';

/**
 * Example usage:
 *
 * import Accordion, { AccordionRow } from './components/Accordion';
 *
 * function MyComponent() {
 *   return (
 *     <Accordion>
 *       <AccordionRow title="First row">
 *          Some content here
 *       </AccordionRow>
 *       <AccordionRow title="Second row">
 *          more content
 *       </AccordionRow>
 *     </Accordion>
 *   )
 * }
 */

const AccordionRowHeader = styled.div`
  height: auto;
  cursor: pointer;
  padding: 20px;
  display: flex;
  max-width: 700px;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.white};
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  color:  ${COLORS.blue};
  font-weight: 600;
  border-bottom: 1px solid ${COLORS.lightgray};
`;

const AccordionRowIcon = styled(ArrowDown)`
  transform: rotate(${props => props.open ? 180 : 0}deg);
  transition: 0.2s ease transform;
`;

const AccordionRowContent = styled.div`
  background-color: ${COLORS.white};
  height: ${props => props.open ? 'auto' : 0};
  transition: 0.2s ease height;
  overflow: hidden;
  max-width: 700px;
  width: 95%;
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
`;

export const AccordionRow = ({ children, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AccordionRowHeader onClick={() => setOpen(!open)}>
        {title}
        <AccordionRowIcon open={open}/>
      </AccordionRowHeader>
      <AccordionRowContent open={open}>
        {children}
        <br/>
      </AccordionRowContent>
    </div>
  )
}

AccordionRow.propTypes = {
  title: PropTypes.string,
}

const AccordionWrapper = styled.div`
  background-color: ${COLORS.white};
  height: auto;
  font-size: 14px;
  font-family: ${FONTS.font2};
  color: black;
  min-width: 220px;
  justify-content: 'center';
  align: 'center;'
`;

const Accordion = ({ children }) => {
  return (
    <AccordionWrapper>
      {children}
    </AccordionWrapper>
  )
}

export default Accordion;
