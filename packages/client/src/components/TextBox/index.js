import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Text(props) {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            {/*[type is either standard-basic + label is the name of the text field]*/}
            <TextField
                id={props.type}
                label={props.label}
                placeholder={props.placeholder}
                /* keep the heading text floating to match wireframe */
                InputLabelProps={{shrink: true}}
                value = {props.value}
                onChange={props.onChange}
            />
        </form>
    );
}
