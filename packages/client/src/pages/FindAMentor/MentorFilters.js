import React from 'react';

import Accordion, { AccordionRow } from '../../components/Accordion';
import Checkbox from '../../components/Checkbox';

const MentorFilters = ({ onChange }) => {
  const handleChange = (filterCategory, change) => {
    if (onChange instanceof Function) {
      onChange(filterCategory, change);
    }
  }

  return (
    <div>
      <Accordion>
        <AccordionRow title="Grade Level">
          <Checkbox
            name="es"
            label="Elementary School (K-5)"
            onChange={(change) => handleChange('gradeLevel', change)}
          />
          <Checkbox
            name="ms"
            label="Middle School (6-8)"
            onChange={(change) => handleChange('gradeLevel', change)}
          />
          <Checkbox
            name="hs"
            label="High School (9-12)"
            onChange={(change) => handleChange('gradeLevel', change)}
          />
        </AccordionRow>
        <AccordionRow title="Subject">
        <Checkbox
          name="math"
          label="Math"
          onChange={(change) => handleChange('subject', change)}
        />
        <Checkbox
          name="physics"
          label="Physics"
          onChange={(change) => handleChange('subject', change)}
        />
        <Checkbox
          name="reading"
          label="Reading"
          onChange={(change) => handleChange('subject', change)}
        />
        </AccordionRow>
        <AccordionRow title="Special Needs">
          <Checkbox
            name="specialNeeds"
            label="Special Needs"
            onChange={(change) => handleChange('specialNeeds', change)}
          />
        </AccordionRow>
      </Accordion>
    </div>
  )
}

export default MentorFilters;
