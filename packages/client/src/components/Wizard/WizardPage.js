import React from "react";
import Typography from "@material-ui/core/Typography";

export default function WizardPage(props) {
  if (props.activeStep !== props.id) {
    return (null)
  } else {
  return (
    <div>
        {props.children}
    </div>
  );}
}
