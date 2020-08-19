import React from 'react';
import TextField from '@material-ui/core/TextField';
import {FONTS} from '../../constants';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import Container from '@material-ui/core/Container';

const Wrapper = styled.div`
  text-align: center;
`;

  const Title = styled.h1`
  font-size: 48px;
  font-family:${FONTS.font2};
  left: calc(50% - 267px/2 + 0.5px)
  top: 86px
`;

const Subtitle = styled.p`
  font-size: 22px;
  font-weight: 500;
  font-style: normal;
  font-family:${FONTS.font2};
`;

const Headings = styled.p`
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  line-height: 28px;
  font-family:${FONTS.font2};
  text-align: left;
`;

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
        <Title>{t('Contact.Title')}</Title>
        <Subtitle>{t('Contact.Subtitle')}</Subtitle>  <br /><br />
        <Container maxWidth="sm" >
        <form noValidate autoComplete="off">
            <Headings>{t('Contact.Name')}</Headings>
            <TextField id="outlined-basic" variant="outlined" fullWidth/>
            <Headings>{t('Contact.Email')}</Headings>
            <TextField id="outlined-basic" variant="outlined" fullWidth/>
            <Headings>{t('Contact.Message')}</Headings>
            <TextField id="standard-multiline-static" variant="outlined" fullWidth multiline rows={6}/>
        </form>
        </Container> <br /><br />
        <Button theme="accent" size="md">{t('Submit')}</Button>
    </Wrapper>
  )
}

export default ContactUs;
