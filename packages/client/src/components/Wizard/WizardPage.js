import React from "react";
import Typography from "@material-ui/core/Typography";

export default function WizardPage(props) {
  if (props.activeStep != props.id) {
    return (<></>)
  } else {
  return (
    <div>
        {props.children}
    </div>
  );}
}
