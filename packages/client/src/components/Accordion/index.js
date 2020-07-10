import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants';
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
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccordionRowIcon = styled(ArrowDown)`
  transform: rotate(${props => props.open ? 180 : 0}deg);
  transition: 0.2s ease transform;
`;

const AccordionRowContent = styled.div`
  background-color: ${COLORS.grey};
  height: ${props => props.open ? 'auto' : 0};
  transition: 0.2s ease height;
  overflow: hidden;
`;

export const AccordionRow = ({ children, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AccordionRowHeader onClick={() => setOpen(!open)}>
        {title}
        <AccordionRowIcon open={open} />
      </AccordionRowHeader>
      <AccordionRowContent open={open}>
        {children}
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
  color: black;
  min-width: 220px;
`;

const Accordion = ({ children }) => {
  return (
    <AccordionWrapper>
      {children}
    </AccordionWrapper>
  )
}

export default Accordion;
