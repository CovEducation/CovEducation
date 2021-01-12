import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS, FONTS } from '../../constants';

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

const CardFooter = styled.a`=
    cursor: pointer;
    margin: 0px auto;
    color:  ${COLORS.blue};
    font-weight: 600;
    text-decoration: none;
    display: block;
`;

const CardContent = styled.div`
    display: block;
    padding: 10px;
    color:  ${COLORS.blue};
    height: 200px;
    width: 300px;
    text-align: center;
`;

const CardTags = styled.div`
    margin: 10px auto;
    color:  ${COLORS.blue};
    font-size: 12px;
    display: block;
    margins: auto;
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    background: linear-gradient(180deg, rgba(210,210,210,1) 34%, rgba(237,237,237,1) 100%);
    margin: 20px;
    border-radius: 10px;

    &:hover {
        background: linear-gradient(180deg, rgba(210,210,210,0.5) 34%, rgba(237,237,237,0.5) 100%);
    }
`;

const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 300px;
    justify-content: center;
`;


export const Card = ({ children, title, url, tags }) => {
    return (
        <div>
            <CardWrapper>
                <CardContent>
                    {children}
                </CardContent>
                <CardFooter href={url}>
                    {title}
                </CardFooter>
                <CardTags>
                    {tags? tags.join(", "): ""}
                </CardTags>
            </CardWrapper>
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
        <CardsContainer>
            {children}
        </CardsContainer>
    )
}

export default Cards;
