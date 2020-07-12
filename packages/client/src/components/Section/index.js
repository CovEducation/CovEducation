import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { COLORS } from '../../constants';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: props => props.backgroundColor in COLORS ? COLORS[props.backgroundColor] : COLORS['white'],
    },
}));

export default function Section(props = {
    children: '',
    backgroundColor: 'white',
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