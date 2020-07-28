import React from 'react';
import Grid from '@material-ui/core/Grid';
import { flexbox } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Button from '../../components/Button';
import Image from 'material-ui-image';
import ImText from '../../components/TextandImage';


import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Edit from '@material-ui/icons/EditTwoTone';
import Mail from '@material-ui/icons/ContactMail';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Arrow from './img/arrow.svg'; //svg from the figma, '<Image src={Arrow}/>'

const styles = {
    LargeIcon:{
        fontSize: '150px',
    }
  };


const ForMentors = () => {
  return (
    <div>

    <Typography variant = "h2" align = "center">
        How It Works
    </Typography>
    <Typography variant = "h6" align = "center">
        For Mentors
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
            <Edit  style = {styles.LargeIcon} />
        </Grid>
        <Grid item alignItems = "center" justify = "center">
            <Typography align = "center">
                Edit Your Profile! <br /> <br />
                Log in to visit your Profile page, where you will be able to edit your information including a bio. Make sure you check off "Listed as Available Mentor".
            </Typography>
        </Grid>
        </Grid>

        <Grid item lg = {1} >
            <Image src={Arrow} />
        </Grid>

        <Grid container direction = "column" alignItems = "center" spacing = {0} xs ={3} lg = {2}>
        <Grid item justify="center" >
            <Mail  style = {styles.LargeIcon} />
        </Grid>
        <Grid item alignItems = "center" justify = "center">
            <Typography align = "center">
                Contact Mentee <br /> <br />
                When a parent requests you as a mentor, you will recieve an email with further instructions and contact information. Be sure to contact them as soon as possible to introduce yourself!
            </Typography>
        </Grid>
        </Grid>

    </Grid>
    </div>
  )
}

export default ForMentors;