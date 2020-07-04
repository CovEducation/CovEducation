import React from 'react';

export default function WizardPage(props) {
  if (props.activeStep !== props.id) {
    return (<></>)
  } else {
  return (
    <div>
        {props.children}
    </div>
  );}
}
