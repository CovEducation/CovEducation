import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';

const HomepageHeader = styled.div`
  text-align: center;
`;

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <HomepageHeader>
        <h1>CovEducation</h1>
        <p>{t('home.subtitle')}</p>
        <Button theme="accent">{t('home.forMenteesButton')}</Button>
        <Button theme="accent">{t('home.forMentorsButton')}</Button>
      </HomepageHeader>
      <HomepageHeader>
        <h2>{t('home.whyBePartOfCovEd')}</h2>
      </HomepageHeader>
      <HomepageHeader>
        <h2>{t('home.howCovEdWorks')}</h2>
      </HomepageHeader>
      <HomepageHeader>
        <h2>{t('home.findTutors')}</h2>
      </HomepageHeader>
      <HomepageHeader>
        <h2>{t('home.questions')}</h2>
      </HomepageHeader>
    </div>
  )
}

export default HomePage;