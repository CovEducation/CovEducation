import React, { useState } from 'react';
import styled from 'styled-components';
import { FONTS, subjects, resources, tags } from '../../constants';
import Section from '../../components/Section';
import Cards, { Card } from '../../components/Cards';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

const ResourcesWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  p{
    font-family: ${FONTS.font2};
  }
  h2 {
    font-family: ${FONTS.font1};
    font-weight: 500;
    padding-top: 30px;
  }
`;

const Resources = () => {

    return (
        <ResourcesWrapper>

            <Section p="100px">
                <div>
                    <h1 style={{ textAlign: 'center' }}> Resources </h1>
                </div>
                <Cards>
                    {resources.map((r) => {
                        return (
                            <Card title={r.label} url={r.url} tags={r.tags}>
                                {r.description}
                            </Card>
                        )
                    })}
                </Cards>

            </Section>
        </ResourcesWrapper>
    )
}
export default Resources;
