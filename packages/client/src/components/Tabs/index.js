import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 448,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // number of tabs --> creates indices
    const values = [1, 2, 3, 4];
    // The text inside each
    const texts = props.texts;

    return (
        <div className={classes.root}>
            <Tabs
                /* sets horizontal or vertical tabs */
                orientation="vertical"
                /* changes type of tab feature if tabs > height*/
                // variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Tabs Example"
                className={classes.tabs}
            >
                {
                    values.map(
                        value => (
                            // need to add a way to change the label (string)
                            <Tab label="Item" {...a11yProps({value})} />
                        )
                    )
                }

            </Tabs>
            {
                texts.map(
                    (text, index) => (
                        <TabPanel value={value} index={index}>
                            {text}
                        </TabPanel>
                    )
                )
            }
        </div>
    );
}
