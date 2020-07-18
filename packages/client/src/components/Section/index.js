import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { COLORS } from '../../constants';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: props => props.backgroundColor in COLORS ? COLORS[props.backgroundColor] : COLORS['white'],
        margin: props => props.m,
        padding: props => props.p,
        mx: props => props.mx,
    },
}));

export default function Section(props = {
    children: '',
    backgroundColor: 'white',
    m: 0,
    p: 0,
    mx: 'auto',
}) {
    const { children, backgroundColor, m, p, mx, ...otherProps } = props;
    const classes = useStyles(props);
    return (
        <Box className={classes.root} {...otherProps}>
            {props.children}
        </ Box>
    );
}

Section.propTypes = {
    backgroundColor: PropTypes.string,
    mx: PropTypes.string,
};
