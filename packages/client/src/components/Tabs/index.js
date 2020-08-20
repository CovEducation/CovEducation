import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';

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
        backgroundColor: '#F2BE32'
    }
})(Tabs);
const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 200,
        fontWeight: theme.typography.fontWeightRegular,
        // marginRight: theme.spacing(4),
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
const useStyles2 = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    padding: {
        padding: theme.spacing(3)
    }
}));

// const ProcessTabs = withStyles({
//     indicator: {
//         display: 'flex',
//         backgroundColor: '#F2BE32',
//         justifyContent: 'center',
//         '& > span': {
//             maxWidth: 70,
//             width: '100%'
//         }
//     }
// })(Tabs);
// const useStyles = makeStyles({
//     root: {
//         flexGrow: 1,
//         backgroundColor: 'transparent',
//         display: 'flex',
//         height: 300
//     },
//     // tabs: {
//     //     borderRight: '1px solid rgba(0, 0, 0, 0.12)'
//     // },
//     process: {
//         textTransform: 'none',
//         color: 'var(--text)',
//         backgroundColor: 'var(--background)',
//         borderRight: '3px solid #F2BE32',
//         borderLeft: '3px solid #F2BE32',
//         borderTop: '3px solid #F2BE32',
//         borderBottom: '3px solid #F2BE32'
//     }
// });
// const selected = {
//     '--background': '#F2BE32',
//     '--text': '#fff'
// };
// const defaultColor = {
//     '--background': '#ffffff',
//     '--text': '#003c5e'
// };

// export default function VTabs(props) {
//     const classes = useStyles();
//     const [value, setValue] = React.useState(0);
//
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//
//     // the text inside each
//     const texts = props.texts;
//     // the labels of each
//     const labels = props.labels;
//
//     return (
//         <div className={classes.root}>
//             <ProcessTabs
//                 orientation="horizontal"
//                 indicatorColor="primary"
//                 value={value}
//                 onChange={handleChange}
//                 aria-label="Tabs Example"
//                 // className={classes.tabs}
//             >
//                 {labels.map((label, index) => (
//                     <Tab
//                         disableRipple={ true }
//                         key={index}
//                         label={label}
//                         style={index === value ? selected : defaultColor}
//                         className={classes.process}
//                         {...a11yProps({ index })}
//                     />
//                 ))}
//             </ProcessTabs>
//             {texts.map((text, index) => (
//                 <TabPanel value={text} index={index}>
//                     {text}
//                 </TabPanel>
//             ))}
//         </div>
//     );
// }

export default function HTabs(props) {
    const classes = useStyles2();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    {props.labels.map((label, index) => (
                        <AntTab label={label} {...a11yProps(index)} />
                    ))}
                </AntTabs>
            </AppBar>
            {props.texts.map((text, index) => (
                <TabPanel value={value} index={index}>
                    {text}
                </TabPanel>
            ))}
        </div>
    );
}

