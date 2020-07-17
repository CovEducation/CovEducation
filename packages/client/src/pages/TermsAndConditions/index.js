import React from 'react';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import { TERMSCONDITIONS } from '../../constants.js';

const TermsAndConditions = () => {
  return (
    // <>
    <div fontSize={[2]} bg="white" heading="" subhead="" p={[1,2,2,2]} mt={7}>
    <Row>
      <Col>
      <h2 className="text-center"><span className="light-h2">Terms and Conditions</span></h2>
        {TERMSCONDITIONS.map((termcondition) => {
          return(
            <Col>
            <h3>
              {termcondition.num + ". " + termcondition.title}
            </h3>
            <p>
              {termcondition.body}
            </p>
          </Col>
          )
        })}
      </Col>
    </Row>
    </div>
    // </>
  )
}

export default TermsAndConditions;
