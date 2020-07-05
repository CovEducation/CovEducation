import React from 'react';
import ProgressMobileStepper from './ProgressBar'

export default function Wizard(props) {

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
          {props.content[activeStep] || null}
          <ProgressMobileStepper steps={props.content.length} currentstep={activeStep} next={handleNext} back={handleBack}/>
    </div>
  );
}
