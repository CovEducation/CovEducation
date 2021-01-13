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
    font-size: 18px;
    text-decoration: none;
    display: block;
`;

const CardContent = styled.div`
    display: block;
    padding: 10px;
    color:  ${COLORS.darkblue};
    height: 200px;
    width: 300px;
    font-weight: 400;
`;

const CardTags = styled.div`
    padding: 4px;
    margin: 5px 5px;
    background: ${COLORS.lightgray};
    font-size: 15px;
    display: block;
    border-color: ${COLORS.grey};
    border-style: solid;
    border-width: thin;
    border-radius: 10px;
    color: ${COLORS.black};
`;

const TagsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height = 200px;
    justify-content: center;
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    background: ${COLORS.lightblue};
    margin: 20px;
    border-radius: 10px;

    &:hover {
        background: ${COLORS.lightgray};
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
                <TagsContainer>
                    {tags.map((r) => {
                        return (
                            <CardTags>
                                {r}
                            </CardTags>
                        )
                    })}
                </TagsContainer>
            </CardWrapper>
        </div >
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
