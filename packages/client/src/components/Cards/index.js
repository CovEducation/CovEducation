import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS, FONTS } from '../../constants';
import ArrowDown from '../Icons/ArrowDown';

/**
 * Example usage:
 *
 * import Cards, { Card } from './components/Cards';
 *
 * function MyComponent() {
 *   return (
 *     <Cards>
 *       <Card title="First Card">
 *          Some content here
 *       </Card>
 *       <Card title="Second Card">
 *          more content
 *       </Card>
 *     </Cards>
 *   )
 * }
 */

const CardFooter = styled.div`
  height: auto;
  cursor: pointer;
  padding: 5px;
  display: flex;
  max-width: 400px;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.lightblue};
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  color:  ${COLORS.blue};
  font-weight: 600;
`;

const CardContent = styled.div`
  background-color: ${COLORS.lightgray};
  height: auto;
  overflow: hidden;
  max-width: 400px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

export const Card = ({ children, title, url, tags }) => {
    return (
        <div>
            <CardContent>
                {children}
            </CardContent>
            <a href={url}>
                <CardFooter>
                    {title}
                </CardFooter>
            </a>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    tags: PropTypes.array
}


const Cards = ({ children }) => {
    return (
        <Card>
            {children}
        </Card>
    )
}

export default Cards;
