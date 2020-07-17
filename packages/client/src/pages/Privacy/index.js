import React from 'react';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import { PRIVACY } from '../../constants.js';

const Privacy = () => {
  return (
    // <>
    <div fontSize={[2]} bg="white" heading="" subhead="" p={[1,2,2,2]} mt={7}>
    <Row>
      <Col>
      <h2 className="text-center"><span className="light-h2">Privacy Policy</span></h2>
        {PRIVACY.map((privacy) => {
          var body;
          if (privacy.subsection){
            var subsection;
            subsection = privacy.subsection.map((sec) => {
              return(
                <Col><h4>{privacy.num +'.'+sec.num+'. '+sec.title}</h4><p>{sec.body}</p></Col>
              )
            })
            body = <>
              <p>{privacy.body}</p>
              <>{subsection}</>
            </>;
          } else{
            body = <p>{privacy.body}</p>
          }
          return(
            <Col>
            <h3>
              {privacy.num + ". " + privacy.title}
            </h3>
            {body}
          </Col>
          )
        })}
      </Col>
    </Row>
    </div>
    // </>
  )
}

export default Privacy;
