import React from 'react';
import styled from 'styled-components';
import { FONTS, FAQS } from '../../constants';
import Accordion, { AccordionRow } from '../../components/Accordion';
import Section from '../../components/Section';

const FAQsWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  p{
    font-family: ${FONTS.font2};
  }
  h2 {
    font-family: ${FONTS.font1};
    font-weight: 500;
    padding-top: 30px;
  }
`;

const FAQsPage = () => {
  return (
    <FAQsWrapper>
      <Section p="100px">
        <h2> General </h2>
        <Accordion>
          {FAQS.filter((f) => f.category === "general").map((faq) => {
            return (
              <AccordionRow key={faq.question} title={faq.question} id={faq.key}>
                {faq.answer}
              </AccordionRow>
            )
          })}
        </Accordion>
        <h2> For Parents & Students </h2>
        <Accordion>
          {FAQS.filter((f) => f.category === "mentee").map((faq) => {
            return (
              <AccordionRow key={faq.question} title={faq.question} id={faq.key}>
                {faq.answer}
              </AccordionRow>
            )
          })}
        </Accordion>
        <h2> For Mentors </h2>
        <Accordion>
          {FAQS.filter((f) => f.category === "mentor").map((faq) => {
            return (
              <AccordionRow key={faq.question} title={faq.question} id={faq.key}>
                {faq.answer}
              </AccordionRow>
            )
          })}
        </Accordion>
      </Section>
    </FAQsWrapper>
  )
}

export default FAQsPage;
