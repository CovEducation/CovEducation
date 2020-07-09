import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`
    };
}

const ProcessTabs = withStyles({
    indicator: {
        display: 'flex',
        backgroundColor: '#F2BE32',
        justifyContent: 'center',
        '& > span': {
            maxWidth: 40,
            width: '100%'
        }
    }
})(Tabs);

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        display: 'flex',
        height: 448
    },
    tabs: {
        borderRight: '1px solid rgba(0, 0, 0, 0.12)'
    },
    process: {
        textTransform: 'none',
        color: 'var(--text)',
        backgroundColor: 'var(--background)',
        borderRight: '3px solid #F2BE32',
        borderLeft: '3px solid #F2BE32',
        borderTop: '3px solid #F2BE32',
        borderBottom: '3px solid #F2BE32'
    }
});

const selected = {
    '--background': '#F2BE32',
    '--text': '#fff'
};

const defaultColor = {
    '--background': '#ffffff',
    '--text': '#003c5e'
};

export default function VTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // the text inside each
    const texts = props.texts;
    // the labels of each
    const labels = props.labels;

    return (
        <div className={classes.root}>
            <ProcessTabs
                /* sets horizontal or vertical tabs */
                orientation="vertical"
                /* changes type of tab feature if tabs > height*/
                // variant="scrollable"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                aria-label="Tabs Example"
                className={classes.tabs}
            >
                {labels.map((label, index) => (
                    <Tab
                        disableRipple={ true }
                        key={index}
                        label={label}
                        style={index === value ? selected : defaultColor}
                        className={classes.process}
                        {...a11yProps({ index })}
                    />
                ))}
            </ProcessTabs>
            {texts.map((text, index) => (
                <TabPanel value={text} index={index} key={index}>
                    {text}
                </TabPanel>
            ))}
        </div>
    );
}
