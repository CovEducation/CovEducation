import React from 'react';
import Grid from '@material-ui/core/Grid';
import { COLORS, FONTS } from '../../constants';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import Hidden from '@material-ui/core/Hidden';
import ImText from '../../components/TextandImage/index';

import Register from './img/register.svg';
import Find from './img/findMentor.svg';
import Meet from './img/meetMentor.svg';
import Arrow from './img/arrow.svg'; 


const Wrapper = styled.div`
  text-align: center;
  span {
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    line-height: 48px;
    font-family:${FONTS.font2};
  }
`;
  const Title = styled.h1`
  padding-top: 50px;
  font-size: 40px;
  font-family:${FONTS.font2};
  left: calc(50% - 267px/2 + 0.5px)
  top: 86px
`;

const Subtitle = styled.p`
  font-size: 23px;
  font-weight: 500;
  font-style: normal;
  line-height: 48px;
  font-family:${FONTS.font2};
`;

const Body = styled.div`
    font-family: ${FONTS.font2};
    font-style: normal;
    font-weight: normal;
    font-size: max(1vw, 16px);
    line-height: 27px;
    display: flex;
    font-feature-settings: 'pnum' on, 'lnum' on;
`;

const Circle = styled.circle`
    height: 25px;
    width: 25px;
    background-color: ${COLORS.yellow};
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
`;

const HowItWorks = [
    {
      key: 1,
      row: 1,
      num: 1,
      imgsrc: Register,
      title: 'howItWorksParents.RegisterTitle',
      text: 'howItWorksParents.Register'
      
    }, 
    {
      key: 2,
      imgsrc: Arrow
    },
    {
      key: 3,
      row: 1,
      num:2,
      imgsrc: Find,
      title: 'howItWorksParents.FindTitle',
      text: 'howItWorksParents.FindAMentor'
        
      }, 
      {
        key: 4,
        imgsrc: Arrow
      },
      {
       key: 5,
       row: 1,
       num :3,
       imgsrc: Meet,
       title: 'howItWorksParents.ContactTitle',
       text: 'howItWorksParents.Contact'
        
      }
]

const ForParents = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
        <Title>{t('howItWorksParents.Title')}</Title>
        <Subtitle>{t('howItWorksParents.Subtitle')}</Subtitle>
        <Button theme="light" size="md" color = "accent"fontSize = "14">{('Skip To Application')}</Button>
        <Body>
        <Grid container direction = "row" justify = "center" spacing = {3} alignItems = "center">
          {HowItWorks.map((s) => {
             return (
                 s.key%2 === 0 ? <Hidden smDown> <Grid item md={1} sm = {8}><img src={Arrow}/> </Grid> </Hidden>: 
                <Grid item md={2} sm = {8}> 
                      <ImText arrangement="vertical"  shape="circle" img= {s.imgsrc} minwidth="170px" minheight="170px"> <Circle>{s.num}</Circle><span>{t(s.title)}</span> <br /> {t(s.text)}
                      </ImText> 
                 </Grid>
            
                )
          })}
          </Grid>
          </Body>
    </Wrapper>
  )
}

export default ForParents;