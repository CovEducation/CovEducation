import React from 'react';
import Grid from '@material-ui/core/Grid';
import { flexbox } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import { COLORS, FONTS } from '../../constants';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import Image from 'material-ui-image';


import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Search from '@material-ui/icons/Search';
import People from '@material-ui/icons/People';
import Arrow from './img/arrow.svg'; //svg from the figma, '<Image src={Arrow}/>'

const Wrapper = styled.div`
  text-align: center;
`;

const styles = {
    LargeIcon:{
        fontSize: '150px',
    }
  };

  const Title = styled.h1`
  font-size: 48px;
  font-family:${FONTS.font2};
  left: calc(50% - 267px/2 + 0.5px)
  top: 86px
`;

const Subtitle = styled.p`
  font-size: 27px;
  font-weight: 500;
  font-style: normal;
  line-height: 48px;
  font-family:${FONTS.font2};
`;

const Body = styled.div`
    font-family: ${FONTS.font2};
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 27px;
    display: flex;
    font-feature-settings: 'pnum' on, 'lnum' on;
`;


const ForParents = () => {
  return (
    <Wrapper>
        <Title>How It Works</Title>
        <Subtitle>For Mentors</Subtitle>

        <Button theme="light" size="md">{('Skip To Application')}</Button>

        <Body>
            <Grid container direction = "row" justify = "center">
                <Grid container direction = "column" alignItems = "center" spacing = {0} xs ={3} lg = {2}>
                <Grid item justify="center" >
                    <AccountCircleIcon  style = {styles.LargeIcon} />
                </Grid>
                <Grid item alignItems = "center" justify = "center">
                    Register <br /> <br />
                    Register for an account here! Make sure to input the correct parent email because you will recieve an email-verification link!
                </Grid>
                </Grid>
                <Grid item lg = {1} >
                    <Image src={Arrow} />
                </Grid>
                <Grid container direction = "column" alignItems = "center" spacing = {0} xs ={3} lg = {2}>
                <Grid item justify="center" >
                    <Search  style = {styles.LargeIcon} />
                </Grid>
                <Grid item alignItems = "center" justify = "center">
                    Find A Mentor <br /> <br />
                    Log in to visit the Find A Mentor page , where you will be able to search for and request a mentor. Please only contact one mentor per student .
                </Grid>
                </Grid>
                <Grid item lg = {1} >
                    <Image src={Arrow} />
                </Grid>
                <Grid container direction = "column" alignItems = "center" spacing = {0} xs ={3} lg = {2}>
                <Grid item justify="center" >
                    <People  style = {styles.LargeIcon} />
                </Grid>
                <Grid item alignItems = "center" justify = "center">
                    Contact Mentee <br /> <br />
                    Your mentor will email you to set up an initial meeting time. If you do not hear from your mentor within 48 hours, please request another mentor.
                </Grid>
                </Grid>
            </Grid>
        </Body>
    </Wrapper>
  )
}

export default ForParents;