import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Text(props) {
    return (
        <TextField
            style={{
                margin: '12px',
            }}
            fullWidth
            margin="normal"
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
    );
}
