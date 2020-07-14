import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));

export default function Text(props) {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                autoFocus={props.autoFocus}
                id={props.id}
                label={props.label}
                type={props.type}
                placeholder={props.placeholder}
                InputLabelProps={{ shrink: true }}
                value={props.value}
                error={props.error}
                helperText={props.helperText}
                onChange={props.onChange}
                InputProps={props.endAdornment}
                required={props.required}
            />
        </form>
    );
}
