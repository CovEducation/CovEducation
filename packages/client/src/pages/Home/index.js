import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import LinesBackground from './LinesBackground';
import { COLORS, FONTS } from '../../constants';

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
      <div>
        <h2>{t('home.whyBePartOfCovEd')}</h2>
      </div>
      <div>
        <h2>{t('home.howCovEdWorks')}</h2>
      </div>
      <div>
        <h2>{t('home.findTutors')}</h2>
      </div>
      <div>
        <h2>{t('home.questions')}</h2>
      </div>
    </HomeWrapper>
  )
}

export default HomePage;
