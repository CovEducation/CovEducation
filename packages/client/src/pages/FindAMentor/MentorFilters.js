import React from 'react';

import Accordion, { AccordionRow } from '../../components/Accordion';
import Checkbox from '../../components/Checkbox';

const MentorFilters = () => {
  const handleChange = (change) => {
    console.log(change);
  }

  return (
    <div>
      <Accordion>
        <AccordionRow title="Grade Level">
          <Checkbox value="K-5" label="Elementary School (K-5)" onChange={handleChange} />
          <Checkbox value="6-8" label="Middle School (6-8)" onChange={handleChange} />
          <Checkbox value="9-12" label="High School (9-12)" onChange={handleChange} />
        </AccordionRow>
        <AccordionRow title="Grade Level">
          <Checkbox value="6-8" label="Elementary School (K-5)" />
        </AccordionRow>
        <AccordionRow title="Grade Level">
          <Checkbox value="6-8" label="Elementary School (K-5)" />
        </AccordionRow>
      </Accordion>
    </div>
  )
}

export default MentorFilters;
