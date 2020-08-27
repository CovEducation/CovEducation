import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const GridWrapper = styled.div`
img{
  max-width: min(${props => props.minwidth}, 100%);
  max-height: min(${props => props.minheight}, 100%);
}
img.circle{
  border-radius: 50%;
}
`;

// TODO(mi-yu): make alt prop required for accessibility
const HorzIm = ({ children, imgpath, shape, alt }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
      {shape === "circle"? <img className="circle" src={imgpath} alt={alt} /> : <img src={imgpath} alt={alt} /> }
      </Grid>
      <Grid item xs={12} sm={8}>
      {children}
      </Grid>
    </Grid>
  )
};

const VertIm = ({ children, imgpath, shape, alt }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
      {shape === "circle"? <img className="circle" src={imgpath} alt={alt} /> : <img src={imgpath} alt={alt} /> }
      </Grid>
      <Grid item xs={12}>
      {children}
      </Grid>
    </Grid>
  )
};

export default function ImText(props) {
  return (
    <GridWrapper minwidth={props.minwidth} minheight={props.minheight}>
      {props.arrangement === "horizontal" ? <HorzIm imgpath={props.img} shape={props.shape}>{props.children}</HorzIm> : <VertIm imgpath={props.img} shape={props.shape}>{props.children}</VertIm>}
    </GridWrapper>
  );
};
