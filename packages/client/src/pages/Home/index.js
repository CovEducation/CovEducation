import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import LinesBackground from './LinesBackground';
import { COLORS } from '../../constants';

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
  font-size: 96px;
  margin: 0;
  color: ${COLORS.darkblue};
  font-weight: normal;

  span {
    font-weight: normal;
  }
`;

const HomepageSubtitle = styled.p`
  font-size: 24px;
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