import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import LinesBackground from './LinesBackground';
import { COLORS, FONTS } from '../../constants';
import Section from '../../components/Section';
import ImText from '../../components/TextandImage';

//images
import art from './img/art.svg';
import classroom from './img/classroom.svg';
import community from './img/community.svg';
import cs from './img/cs.svg';
import eco from './img/economics.svg';
import free from './img/free.svg';
import history from './img/history.svg';
import lang from './img/languages.svg';
import math from './img/math.svg';
import mentoring from './img/mentoring.svg';
import music from './img/music.svg';
import science from './img/science.svg';
import testPrep from './img/testPrep.svg';
import writing from './img/writing.svg';



const HomeWrapper = styled.div`
  text-align: center;
`;

const HomepageSection = styled.section`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 90vh;
  position: relative;
  overflow: hidden;
`;

const HomepageTitle = styled.h1`
  font-size: min(7vw, 84px);
  font-family:${FONTS.font1};
  margin: 0;
  color: ${COLORS.darkblue};
  font-weight: 700;
  span {
    font-weight: 400;
  }
  letter-spacing: -0.16px;
  font-feature-settings: 'pnum' on, 'lnum' on;
`;

const HomepageSubtitle = styled.p`
  font-size: min(3vw, 24px);
  font-weight: 400;
  font-family:${FONTS.font2};
  color: ${COLORS.darkblue};
`;

const HomepageBody = styled.div`
  p{
    font-family: ${FONTS.font2};
    font-weight: 300;
  }
  h2 {
    font-family: ${FONTS.font1};
    font-weight: 500;
  }
  span {
    font-size: min(3.5vw, 24px);
    font-weight: 400;
    font-family: ${FONTS.font2};
  }
`;

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <HomeWrapper>
      <HomepageSection style={{ width: '100%' }}>
        <LinesBackground />
        <div>
          <HomepageTitle>CovEd<span>ucation</span></HomepageTitle>
          <HomepageSubtitle>{t('home.subtitle')}</HomepageSubtitle>
          <Button theme="accent" size="md" round>{t('home.forMenteesButton')}</Button>
          <Button theme="accent" size="md" round>{t('home.forMentorsButton')}</Button>
        </div>
      </HomepageSection>
      <HomepageBody>
        <Section p="100px">
          <h2>{t('home.whyBePartOfCovEd')}</h2>
          <Grid container direction = "row" justify = "center">
          <Grid item lg = {4} md = {12} xs = {12}>  <ImText arrangement="horizontal" shape="circle" img={mentoring} minwidth="100px" minheight="100px">
          One-on-One Mentoring<br /> You get to have mentorship beyond academics.</ImText> </Grid>
          <Grid item lg = {4} md = {12} xs = {12}>  <ImText arrangement="horizontal" shape="circle" img={community} minwidth="100px" minheight="100px">
          Title <br /> You get to form lifelong friendships.</ImText> </Grid>
          </Grid>
          <Grid container direction = "row" justify = "center">
          <Grid item lg = {4} md = {12} xs = {12}>  <ImText arrangement="horizontal" shape="circle" img={classroom} minwidth="100px" minheight="100px">
          Title <br /> You get access to speaker series & career panels.</ImText> </Grid>
          <Grid item lg = {4} md = {12} xs = {12}>  <ImText arrangement="horizontal" shape="circle" img={free} minwidth="100px" minheight="100px">
          Title <br /> It’s entirely cost-free!</ImText> </Grid>
          </Grid>
        </Section>
        <Section backgroundColor='lightorange' p="100px">
          <h2>{t('home.howCovEdWorks')}</h2> 
          <Button theme="accent" size="md">{t('home.MenteesLearnMoreButton')}</Button>
          <Button theme="accent" size="md">{t('home.MentorsLearnMoreButton')}</Button>
        </Section>
        <Section p="100px">
          statistics here
        </Section>
        <Section backgroundColor='lightblue' p="100px">
          <span>"{t('home.quote')}"</span>
          <br />
          <p>- {t('home.quoteauth')}</p>
        </Section>
        <Section p="100px">
          <h2>{t('home.findTutors')}</h2>
          <Grid container direction = "row" justify = "center">
          <Grid item lg = {2} md = {6}> <ImText arrangement="vertical" shape="circle" img={writing} minwidth="100px" minheight="100px">
          Writing </ImText> </Grid>
          <Grid item lg = {2}md = {6}> <ImText arrangement="vertical" shape="circle" img={math} minwidth="100px" minheight="100px">
          Math</ImText> </Grid>
          <Grid item lg = {2}md = {6}> <ImText arrangement="vertical" shape="circle" img={science} minwidth="100px" minheight="100px">
          Science</ImText> </Grid>
          <Grid item lg = {2}md = {6}> <ImText arrangement="vertical" shape="circle" img={history} minwidth="100px" minheight="100px">
          History </ImText> </Grid>
          <Grid item lg = {2}md = {6}> <ImText arrangement="vertical" shape="circle" img={cs} minwidth="100px" minheight="100px">
          Computer <br />
          Science</ImText> </Grid> 
          </Grid><br /><br />
          <Grid container direction = "row" justify = "center">
          <Grid item lg = {2}md = {6}> <ImText arrangement="vertical" shape="circle" img={eco} minwidth="100px" minheight="100px">
          Economics</ImText> </Grid>
          <Grid item lg = {2}md = {6}> <ImText arrangement="vertical" shape="circle" img={music} minwidth="100px" minheight="100px">
          Music</ImText> </Grid>
          <Grid item lg = {2}md = {6}> <ImText arrangement="vertical" shape="circle" img={art} minwidth="100px" minheight="100px">
          Art</ImText> </Grid>
          <Grid item lg = {2}md = {6}> <ImText arrangement="vertical" shape="circle" img={lang} minwidth="100px" minheight="100px">
          Languages</ImText> </Grid>
          <Grid item lg = {2}md = {6}> <ImText arrangement="vertical" shape="circle" img={testPrep} minwidth="100px" minheight="100px">
          Test Prep</ImText> </Grid> 
          </Grid>
        </Section>
        <Section backgroundColor='lightorange' p="100px">
          <h2>{t('home.questions')}</h2>
          <p>{t('home.questionsans')}</p>
        </Section>
      </HomepageBody>
    </HomeWrapper>
  )
}

export default HomePage;
