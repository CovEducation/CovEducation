import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';

const COLORS = {
    CovedYellow: '#F2BE32',
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8'
    },
    indicator: {
        backgroundColor: COLORS.CovedYellow,
    }
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 200,
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"'
        ].join(','),
        '&:hover': {
            color: '#003c5e',
            opacity: 1
        },
        '&$selected': {
            color: '#003c5e',
            fontWeight: theme.typography.fontWeightBold
        },
        '&:focus': {
            color: '#003c5e'
        }
    },
    selected: {}
}))((props) => <Tab disableRipple {...props} />);

const HTabStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    padding: {
        padding: theme.spacing(3)
    }
}));

export default function HTabs(props) {
    const classes = HTabStyle();
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    {props.labels.map((label, index) => (
                        <AntTab key={label} label={label} {...a11yProps(index)} />
                    ))}
                </AntTabs>
            </AppBar>
            {props.texts.map((text, index) => (
                <TabPanel value={value} index={index} key={index}>
                    {text}
                </TabPanel>
            ))}
        </div>
    );
}
