import React from 'react';
import Avatar from '@material-ui/core/Avatar';
// TODO: potentially use created button? I am just using the material ui component for now as it has all the features I want. :)
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// TODO: potentially use created text field? I am just using the material ui component for now as it has all the features I want. :)
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.coved.org/">
                CovEducation
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// tested on App.js
export default function SignUp(props) {
    const classes = useStyles();
    //  TODO: Add a menu for isMentor with onClick
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {/* add a switch case for mentors vs. parents */}
                <form className={classes.form} noValidate>
                    <div>
                        {/* logic for mentor vs. parent */}
                        {props.isMentor ? (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="m_firstName"
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="m_firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="m_lastName"
                                        label="Last Name"
                                        name="m_lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="m_email"
                                        label="Email Address"
                                        name="m_email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="major"
                                        label="Major and College"
                                        name="major"
                                        autoComplete=""
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        name="m_password"
                                        label="Password"
                                        type="password"
                                        id="m_password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="s_email"
                                        label="Student Email Address"
                                        name="s_email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="p_email"
                                        label="Parent Email Address"
                                        name="p_email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="grade"
                                        label="Grade"
                                        name="grade"
                                        autoComplete="grade"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </div>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {/* disabled for now */}
                            <Link href="#" variant="body2">
                                Already have an account? Sign in.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}