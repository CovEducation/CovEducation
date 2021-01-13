import React, {useReducer, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {FONTS} from '../../constants';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const API_PATH = 'http://localhost:1992/react-contact-form/api/contact/index.php';

const Wrapper = styled.div`
  text-align: center;
`;

  const Title = styled.h1`
  padding-top: 50px;
  font-size: max(1.5vw, 32px);
  font-weight: 400;
  font-family: ${FONTS.font2};
  left: calc(50% - 267px/2 + 0.5px)
  top: 86px
`;

const Subtitle = styled.p`
  font-size: max(1.1vw, 20px);
  font-weight: 500;
  font-style: normal;
  font-family:${FONTS.font2};
`;

const Headings = styled.p`
  font-style: normal;
  font-size: max(1vw, 16px);
  font-weight: 300;
  font-family: ${FONTS.font2};
  text-align: left;
`;

const FormMessage = styled.p`
  font-style: normal;
  font-size: max(1vw, 16px);
  font-weight: 300;
  font-family: ${FONTS.font2};
  text-align: center;
`;

const formReducer = (state, event) => {
  if(event.reset){
    return{
      name: '',
      email: '',
      message: '',
    }
  }
  return {
    ... state,
    [event.name]: event.value
  }
}

const ContactUsPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useReducer(formReducer, {});
  const { t } = useTranslation();

  const handleSubmit = event => {
    console.log("button pressed");
    event.preventDefault();
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: formData
    })
    .then(result => {
      setSubmitted(true);
      setSubmitMessage("Thank you for contacting us! Your message has been submitted.");
      setTimeout(() => {
        setSubmitted(false);
        setSubmitMessage("");
        setFormData({
          reset: true
        })
      }, 3000);
    })
    .catch(error => {
      setSubmitMessage("There was an error submitting your message. Please try again later.");
      setTimeout(() => {
        setSubmitMessage("");
        setFormData({
          reset: true
        })
      }, 3000);
    });
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  return (
    <Wrapper>
        <Title>{t('Contact.Title')}</Title>
        <Subtitle>{t('Contact.Subtitle')}</Subtitle>  <br />
        <Container maxWidth="sm" >
        <form noValidate autoComplete="off" onSubmit = {handleSubmit}>
            <Headings>{t('Contact.Name')}</Headings>
            <TextField id="outlined-basic" name="name" variant="outlined" onChange={handleChange} value={formData.name || ''} fullWidth/>
            <Headings>{t('Contact.Email')}</Headings>
            <TextField id="outlined-basic" name="email" variant="outlined" onChange={handleChange} value={formData.email || ''} fullWidth/>
            <Headings>{t('Contact.Message')}</Headings>
            <TextField id="standard-multiline-static" name="message" variant="outlined" onChange={handleChange} value={formData.message || ''} fullWidth multiline rows={6}/>
        <br /><br /><br />
        <Button type="submit" disabled={submitted} theme="accent" size="md">{submitted ? t('Submitted') : t('Submit')}</Button>
        
        <div>
          <FormMessage>
            {submitMessage}
          </FormMessage>
        </div>

        </form>
        </Container>
    </Wrapper>
  )
}

export default ContactUsPage;
