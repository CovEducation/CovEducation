import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const resourceinfo = [
  {
    title: "TITLE GOES HERE",
    description: "Description goes here! It should wrap around within this box if it is a longer description. Or the person's job for the profile card",
    thirdline: "if needed goes here",
    numberedicon: "1",
  }
];

const vertGrid = (list) => {

  return (
    <Grid item xs={12} sm container>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1">
            TITLE GOES HERE
          </Typography>
          <Typography variant="body2" gutterBottom>
            Description goes here! It should wrap around within this box if it is a longer description. Or the person's job for the profile card
          </Typography>
          <Typography variant="body2">
            third line if we need it? idk
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" style={{ cursor: 'pointer' }}>
            numbered icon maybe?
          </Typography>
        </Grid>
      </Grid>
  );
};

const horizGrid = (list) => {

  return (
    <Grid item xs={12} sm container>
      <Grid item xs container direction="row" spacing={2}>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1">
            TITLE GOES HERE
          </Typography>
          <Typography variant="body2" gutterBottom>
            Description goes here! It should wrap around within this box if it is a longer description. Or the person's job for the prfile card
          </Typography>
          <Typography variant="body2">
            third line if we need it? idk
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" style={{ cursor: 'pointer' }}>
            numbered icon maybe?
          </Typography>
        </Grid>
      </Grid>
  );
};


export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="image" src="/km.jpg" />
            </ButtonBase>
          </Grid>
            vertGrid() or horizGrid()
            <Grid item>
              <Typography variant="subtitle1">anythingig</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
