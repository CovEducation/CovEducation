import React from 'react';
import ProgressMobileStepper from './ProgressBar'
import WizardPage from './WizardPage'

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
          {props.content.map((page) => {
            return (
              <WizardPage activeStep={activeStep} id={page.key} key={page.key}> {page.value} </WizardPage>
            )
            })}
          <ProgressMobileStepper steps={props.content.length} currentstep={activeStep} next={handleNext} back={handleBack}/>
    </div>
  );
}
