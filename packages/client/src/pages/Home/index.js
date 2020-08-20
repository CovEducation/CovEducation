import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import LinesBackground from './LinesBackground';
import { COLORS, FONTS } from '../../constants';
import Section from '../../components/Section';
import ImText from '../../components/TextandImage';
import Hidden from '@material-ui/core/Hidden';

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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const HomepageSubtitle = styled.p`
  font-size: min(3vw, 24px);
  font-weight: 400;
  font-family:${FONTS.font2};
  color: ${COLORS.darkblue};
`;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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
  p.title {
    font-size: max(1.5vw, 18px);
    font-weight: 400;
    font-family: ${FONTS.font2};
    color: ${COLORS.darkblue};
  }
  p.desc {
    font-size: max(1vw, 16px);
    font-weight: 300;
    font-family: ${FONTS.font2};
  }
  @media (min-width: 768px){
    p.title{
      text-align: left;
    }
    p.desc{
      text-align: left;
    }
  }
`;

const Subjects = [
  {
    key: 'padding'
  },
  {
    key: 1,
    row: 1,
    imgsrc: writing,
    text: 'Writing'
  },
  {
    key: 2,
    row: 1,
    imgsrc: math,
    text: 'Math'
  },
  {
    key: 3,
    row: 1,
    imgsrc: science,
    text: 'Science'
  },
  {
    key: 4,
    row: 1,
    imgsrc: history,
    text: 'History'
  },
  {
    key: 5,
    row: 1,
    imgsrc: cs,
    text: 'Computer Science'
  },
  {
    key: 'padding'
  },
  {
    key: 'padding'
  },
  {
    key: 6,
    row: 2,
    imgsrc: eco,
    text: 'Economics'
  },
  {
    key: 7,
    row: 2,
    imgsrc: music,
    text: 'Music'
  },
  {
    key: 8,
    row: 2,
    imgsrc: art,
    text: 'Art'
  },
  {
    key: 9,
    row: 2,
    imgsrc: lang,
    text: 'Languages'
  },
  {
    key: 10,
    row: 2,
    imgsrc: testPrep,
    text: 'Test Preparation'
  },
  {
    key: 'padding'
  }
]
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const WhyJoin = [
  {
    key: 1,
    title: 'One-on-One Mentoring',
    desc: 'You get to have mentorship beyond academics.',
    imgsrc: mentoring
  },
  {
    key: 2,
    title: 'Lifelong Community',
    desc: 'You get to form lifelong friendships and expand your network.',
    imgsrc: community
  },
  {
    key: 3,
    title: 'Events beyond the classroom',
    desc: 'Access our speaker series, career panels, and networking sessions!',
    imgsrc: classroom
  },
  {
    key: 4,
    title: 'It\'s Free',
    desc: 'It\'s entirely cost-free!',
    imgsrc: free
  }
]

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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
        <Section p="5vw">
          <h2>{t('home.whyBePartOfCovEd')}</h2> <br /><br />
          <Grid container direction = "row" justify = "center" spacing={6}>
          {WhyJoin.map((s) => {
            return (
            <Grid item sm={5} xs = {12}> <ImText arrangement="horizontal" shape="circle" img={s.imgsrc} minwidth="100px" minheight="100px">
              <p className="title">{s.title}</p>   <p className="desc">{s.desc} </p></ImText> </Grid>
            )
          })}
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
          <h2>{t('home.findTutors')}</h2> <br /><br />
          <Grid container direction = "row" spacing={3} justify="center">
          {Subjects.map((s) => {
            return (
                s.key === 'padding' ? <Hidden smDown><Grid item sm={1}/></Hidden> :
                    <Grid item sm={2} xs={6}> <ImText arrangement="vertical" shape="circle" img={s.imgsrc}
                                                      minwidth="100px" minheight="100px">
                      {s.text} </ImText> </Grid>
            )
          })}
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
