import React from 'react';
import Grid from '@material-ui/core/Grid';
import { flexbox } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import Image from 'material-ui-image';


import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Search from '@material-ui/icons/Search';
import People from '@material-ui/icons/People';
import Arrow from './img/arrow.svg'; //svg from the figma, '<Image src={Arrow}/>'

const styles = {
    LargeIcon:{
        fontSize: '150px',
    }
  };


const ForParents = () => {
  return (
    <div>

    <Typography variant = "h2" align = "center">
        How It Works
    </Typography>
    <Typography variant = "h6" align = "center">
        For Parents
    </Typography>

    <Button theme="accent" size="md">{('Skip To Application')}</Button>

    <Grid container direction = "row" justify = "center">
        <Grid container direction = "column" alignItems = "center" spacing = {0} xs ={3} lg = {2}>
        <Grid item justify="center" >
            <AccountCircleIcon  style = {styles.LargeIcon} />
        </Grid>
        <Grid item alignItems = "center" justify = "center">
            <Typography align = "center">
                Register <br /> <br />
                Register for an account here! Make sure to input the correct parent email because you will recieve an email-verification link!
            </Typography>
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
            <Typography align = "center">
                Find A Mentor <br /> <br />
                Log in to visit the Find A Mentor page , where you will be able to search for and request a mentor. Please only contact one mentor per student .
            </Typography>
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
            <Typography align = "center">
                Meet Mentor <br /> <br />
                Your mentor will email you to set up an initial meeting time. If you do not hear from your mentor within 48 hours, please request another mentor.
            </Typography>
        </Grid>
        </Grid>

    </Grid>
    </div>
  )
}

export default ForParents;