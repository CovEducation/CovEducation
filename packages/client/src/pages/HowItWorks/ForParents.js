import React from 'react';
import Grid from '@material-ui/core/Grid';
import { COLORS, FONTS } from '../../constants';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <Wrapper>
        <Title>{t('howItWorksParents.Title')}</Title>
        <Subtitle>{t('howItWorksParents.Subtitle')}</Subtitle>

        <Button theme="light" size="md">{('Skip To Application')}</Button>

        <Body>
            <Grid container direction = "row" justify = "center">
                <Grid container direction = "column" alignItems = "center" spacing = {0} xs ={3} lg = {2}>
                <Grid item justify="center" >
                    <AccountCircleIcon  style = {styles.LargeIcon} />
                </Grid>
                <Grid item alignItems = "center" justify = "center">
                    {t('howItWorksParents.RegisterTitle')} <br /> <br />
                    {t('howItWorksParents.Register')}
                </Grid>
                </Grid>
                <Grid item lg = {1} >
                    <img src={Arrow} />
                </Grid>
                <Grid container direction = "column" alignItems = "center" spacing = {0} xs ={3} lg = {2}>
                <Grid item justify="center" >
                    <Search  style = {styles.LargeIcon} />
                </Grid>
                <Grid item alignItems = "center" justify = "center">
                    {t('howItWorksParents.findTitle')} <br /> <br />
                    {t('howItWorksParents.FindAMentor')}
                </Grid>
                </Grid>
                <Grid item lg = {1} >
                    <img src={Arrow} />
                </Grid>
                <Grid container direction = "column" alignItems = "center" spacing = {0} xs ={3} lg = {2}>
                <Grid item justify="center" >
                    <People  style = {styles.LargeIcon} />
                </Grid>
                <Grid item alignItems = "center" justify = "center">
                    {t('howItWorksParents.ContactTitle')} <br /> <br />
                    {t('howItWorksParents.Contact')}
                </Grid>
                </Grid>
            </Grid>
        </Body>
    </Wrapper>
  )
}

export default ForParents;
