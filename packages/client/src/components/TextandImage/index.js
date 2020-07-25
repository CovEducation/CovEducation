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

const HorzIm = ({children, imgpath, shape}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} justify="flex-end">
      {shape == "circle"? <img className="circle" src={imgpath} /> : <img src={imgpath} /> }
      </Grid>
      <Grid item xs={12} sm={8} justify="flex-start">
      {children}
      </Grid>
    </Grid>
  )
};

const VertIm = ({children, imgpath, shape}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} justify="center">
      {shape == "circle"? <img className="circle" src={imgpath} /> : <img src={imgpath} /> }
      </Grid>
      <Grid item xs={12} justify="center">
      {children}
      </Grid>
    </Grid>
  )
};

export default function ImText(props) {
  return (
    <GridWrapper minwidth={props.minwidth} minheight={props.minheight}>
      {props.arrangement == "horizontal" ? <HorzIm imgpath={props.img} shape={props.shape}>{props.children}</HorzIm> : <VertIm imgpath={props.img} shape={props.shape}>{props.children}</VertIm>}
    </GridWrapper>
  );
};
