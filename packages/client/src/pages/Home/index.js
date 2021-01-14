import React from 'react';
import Carousel from 'react-elastic-carousel';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import Link from '@material-ui/core/Link';
import Button from '../../components/Button';
import LinesBackground from './LinesBackground';
import { COLORS, FONTS } from '../../constants';
import Section from '../../components/Section';
import ImText from '../../components/TextandImage';
import Hidden from '@material-ui/core/Hidden';

// Images
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
import step1 from './img/step1.svg';
import step2 from './img/step2.svg';
import step3 from './img/step3.svg';

const Circle = styled.div`
    height: 20px;
    width: 20px;
    background-color: ${COLORS.yellow};
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
`;

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
    font-weight: 400;
  }
  h2 {
    font-size: max(2.25vw, 21px);
    font-family: ${FONTS.font1};
    font-weight: 500;
  }
  h3 {
    font-size: max(1.6vw, 18px);
    font-family: ${FONTS.font2};
    font-weight: 200;
  }
  span {
    font-size: min(3.5vw, 24px);
    font-weight: 400;
    font-family: ${FONTS.font2};
  }
  p.title {
    font-size: max(1.75vw, 18px);
    font-weight: 400;
    font-family: ${FONTS.font2};
    color: ${COLORS.darkblue};
  }
  p.desc {
    font-size: max(1.25vw, 16px);
    font-weight: 400;
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

const howItWorks = [
  {
    key: 1,
    step: 'home.howItWorks.step1',
    imgsrc: step1
  },
  {
    key: 2,
    step: 'home.howItWorks.step2',
    imgsrc: step2
  },
  {
    key: 3,
    step: 'home.howItWorks.step3',
    imgsrc: step3
  }
]

const Subjects = [
  {
    key: "padding",
    text: "padding-row-1-start"
  },
  {
    key: 1,
    row: 1,
    imgsrc: writing,
    text: 'home.subjects.Writing'
  },
  {
    key: 2,
    row: 1,
    imgsrc: math,
    text: 'home.subjects.Math'
  },
  {
    key: 3,
    row: 1,
    imgsrc: science,
    text: 'home.subjects.Science'
  },
  {
    key: 4,
    row: 1,
    imgsrc: history,
    text: 'home.subjects.History'
  },
  {
    key: 5,
    row: 1,
    imgsrc: cs,
    text: 'home.subjects.ComputerScience'
  },
  {
    key: "padding",
    text: "padding-row-1-end"
  },
  {
    key: "padding",
    text: "padding-row-2-start"
  },
  {
    key: 6,
    row: 2,
    imgsrc: eco,
    text: 'home.subjects.Economics'
  },
  {
    key: 7,
    row: 2,
    imgsrc: music,
    text: 'home.subjects.Music'
  },
  {
    key: 8,
    row: 2,
    imgsrc: art,
    text: 'home.subjects.Art'
  },
  {
    key: 9,
    row: 2,
    imgsrc: lang,
    text: 'home.subjects.Languages'
  },
  {
    key: 10,
    row: 2,
    imgsrc: testPrep,
    text: 'home.subjects.testPrep'
  },
  {
    key: "padding",
    text: "padding-row-2-end"
  }
]
const WhyJoin = [
  {
    key: 1,
    title: 'home.whyJoin.mentoringTitle',
    desc: 'home.whyJoin.mentoring',
    imgsrc: mentoring
  },
  {
    key: 2,
    title: 'home.whyJoin.communityTitle',
    desc: 'home.whyJoin.community',
    imgsrc: community
  },
  {
    key: 3,
    title: 'home.whyJoin.classroomTitle',
    desc: 'home.whyJoin.classroom',
    imgsrc: classroom
  },
  {
    key: 4,
    title: 'home.whyJoin.freeTitle',
    desc: 'home.whyJoin.costFree',
    imgsrc: free
  }
]

const Testimonials = [
  {
    key: 1,
    text: 'home.testimonials.0.testimonial', 
    auth: 'home.testimonials.0.author'
  },
  {
    key: 2,
    text: 'home.testimonials.1.testimonial',
    auth: 'home.testimonials.1.author'
  },
  {
    key: 3,
    text: 'home.testimonials.2.testimonial',
    auth: 'home.testimonials.2.author'
  },
  {
    key: 4,
    text: 'home.testimonials.3.testimonial',
    auth: 'home.testimonials.3.author'
  },
  {
    key: 5,
    text: 'home.testimonials.4.testimonial',
    auth: 'home.testimonials.4.author'
  },
  {
    key: 6,
    text: 'home.testimonials.5.testimonial',
    auth: 'home.testimonials.5.author'
  }
]

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <HomeWrapper>
      <HomepageSection style={{ width: '100%' }}>
        <LinesBackground />
        <div>
          <HomepageTitle>CovEd<span>ucation</span></HomepageTitle>
          <HomepageSubtitle>{t('home.subtitle')}</HomepageSubtitle>
          <a href="/parents"><Button theme="accent" size="md" round>{t('home.forMenteesButton')}</Button></a>
          <a href="/mentors"><Button theme="accent" size="md" round>{t('home.forMentorsButton')}</Button></a>
        </div>
      </HomepageSection>
      <HomepageBody>
        <Section p="5vw">
          <h2>{t('home.whyBePartOfCovEd')}</h2> <br /><br />
          <Grid container direction="row" justify="center" spacing={6}>
            {WhyJoin.map((s) => {
              return (
                <Grid
                  key={s.title}
                  item sm={5}
                  xs={12}
                >
                  <ImText arrangement="horizontal" shape="circle" img={s.imgsrc} minwidth="100px" minheight="100px">
                    <p className="title">{t(s.title)}</p>
                    <p className="desc">{t(s.desc)}</p>
                  </ImText>
                </Grid>
              )
            })}
          </Grid>
        </Section>
        <Section backgroundColor='lightorange' p="75px">
          <h2>{t('home.howCovEdWorks')}</h2><br />
          <Grid container direction="row" spacing={3} justify="center">
            {howItWorks.map((s) => {
              return (
                <Grid key={s.step} item md={4} sm={12} xs={12}>
                  <ImText arrangement="vertical" img={s.imgsrc}> <Circle>{s.key}</Circle> {t(s.step)}
                  </ImText>
                </Grid>
              )
            })}
          </Grid><br /><br />
          <span>{t('home.learnMore')}</span><br /><br />
          <a href="/parents"><Button theme="accent" size="md">{t('home.MenteesLearnMoreButton')}</Button></a>
          <a href="/mentors"><Button theme="accent" size="md">{t('home.MentorsLearnMoreButton')}</Button></a>
        </Section>
        <Section p="75px">
          <h2>{t('home.hearFromUs')}</h2><br />
          {/* <p className="title">{t('home.testimonials.testimonial6')}</p>
          <p>{t('home.testimonialauths.testimonial6auth')}</p> */}
          <Carousel>
            {Testimonials.map((s) => 
              <div key={s.key}>
                <h3>{t(s.text)}</h3>
                <p>{t(s.auth)}</p>
              </div>
            )}
          </Carousel>
          {/* carousel currently kind of ugly and i don't think formatting can be changed */}
          {/* may have to custom create Carousel in components and dictate formatting there, 
          but i'm not sure how to actually put all of the pieces together */}
        </Section>
        <Section backgroundColor='lightblue' p="100px">
          <span>"{t('home.quote')}"</span>
          <br />
          <p>- {t('home.quoteauth')}</p>
        </Section>
        <Section p="75px">
          <h2>{t('home.findTutors')}</h2> <br /><br />
          <Grid container direction="row" spacing={3} justify="center">
            {Subjects.map((s) => {
              return (
                s.key === "padding" ? (
                  <Hidden key={s.text} smDown>
                    <Grid item sm={1} />
                  </Hidden>
                ) : (
                  <Grid key={s.text} item sm={2} xs={6}>
                    <ImText
                      arrangement="vertical"
                      shape="circle"
                      img={s.imgsrc}
                      minwidth="100px"
                      minheight="100px"
                    >
                      {t(s.text)}
                    </ImText>
                  </Grid>
                )
              )
            })}
          </Grid>
        </Section>
        <Section backgroundColor='lightorange' p="100px">
          <h2>{t('home.questions')}</h2>
          <p>
            <Trans i18nKey="home.questionsans">
              Check out our <Link href='/faqs'> FAQs page </Link> to see if we've already answered your question or <Link href='/contactus'> Contact Us </Link>!
        </Trans>
          </p>
        </Section>
      </HomepageBody>
    </HomeWrapper>
  )
}

export default HomePage;
