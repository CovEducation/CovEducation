import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import LinesBackground from './LinesBackground';
import { COLORS, FONTS } from '../../constants';
import Section from '../../components/Section';

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
        </Section>
        <Section backgroundColor='lightorange' p="100px">
          <h2>{t('home.howCovEdWorks')}</h2>
          <Button theme="accent" size="md">{t('home.MenteesLearnMoreButton')}</Button>
          <Button theme="accent" size="md">{t('home.MentorsLearnMoreButton')}</Button>
        </Section>
        <Section p="100px">
          Statistics
        </Section>
        <Section backgroundColor='lightblue' p="100px">
          <span>"{t('home.quote')}"</span>
          <br />
          <p>- {t('home.quoteauth')}</p>
        </Section>
        <Section p="100px">
          <h2>{t('home.findTutors')}</h2>
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
