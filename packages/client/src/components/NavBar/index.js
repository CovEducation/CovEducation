import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Wizard from '../Wizard';
import Button from '../Button';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import { withStyles } from "@material-ui/styles";


const Wiz_content = ['page1', <Button>oh boi</Button>, 'page3']

const TextThemes = {
  fontSize: {
    lg: 22,
    sm: 18,
  }
}

const useStyles = makeStyles({
  fontFamily: 'Aspira',
  fontFamily: 'sans-serif',
  paddingRight: '40px',
  color: COLORS.blue,
  fontSize: TextThemes['fontSize']['sm'],
  fontWeight: 'normal'
});

const styles = theme => ({
  root: {
    fontFamily: 'Aspira', 
    fontFamily: 'sans-serif', 
    paddingRight: '40px', 
    color: COLORS.blue, 
    fontSize: TextThemes['fontSize']['sm'], 
    fontWeight: 'normal'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const styleLink = withStyles(styles)(props =>{
  const{ children, classes, ...other} = props;
  return(
    <Link></Link>
  );
});

const styledLink = styled('Link') ({
  fontColor: COLORS.yellow,
})

const timeoutLength = 300;


export default function NavBar(props)  {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  let menuOpen = false;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    menuOpen = false;
    setAnchorEl(null);
  };

  const keepMenuOpen = () => {
    menuOpen = true;
  }

  const closeMenu = () => {
    menuOpen = false;
  }

  const leaveButton = () => {
    // Set a timeout so that the menu doesn't close before the user has time to
    // move their mouse over it
    setTimeout(() => {
      while(!menuOpen) {

      }
      if (!menuOpen) {
        setAnchorEl(null);
      } else {
        leaveButton();
        closeMenu();
      }
    }, timeoutLength);
  }

  let userLinks;
  if (true) {
    userLinks = (
      <>
        <Link style={{fontFamily: 'Aspira', fontFamily:'sans-serif', paddingRight: '40px', color: COLORS.blue, fontSize: TextThemes['fontSize']['sm'], fontWeight: 'normal'}} href="/login">Login</Link>
        <div/>
        <Modal title="Sign Up" trigger={<Button theme='accent' size='smmd'> Sign Up </Button>}> <Wizard content={Wiz_content} /> </Modal>
      </>
    );
  } else {
    userLinks = (
      <>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-navbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          onMouseOver={handleMenu}
          // onMouseLeave={leaveButton}
        >
          <AccountCircleIcon/>
          <div style={{padding:'10px'}}/>
          <Grid style={{fontFamily: 'Aspira', fontFamily:'sans-serif', paddingRight: '40px', color: COLORS.blue, fontSize: TextThemes['fontSize']['sm'], fontWeight: 'normal'}}>
            {'Tim Beaver'}
          </Grid>
        </IconButton>
        <Menu
          id="menu-navbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          onMouseOver={keepMenuOpen}
          onClose={handleClose}
          onMouseLeave={handleClose}
          MenuListProps={{ onMouseLeave: handleClose, onMouseEnter: closeMenu}}
        >
          <MenuItem href='/profile'>Dashboard</MenuItem>
          <MenuItem style={{ color: 'red' }}>Sign Out</MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <>
      <AppBar color='white' flex-direction='row' position={props.position}>
        <Toolbar>
          <Grid>
            <Link style={{fontFamily: 'Aspira', fontFamily:'sans-serif', paddingRight: '15px', paddingLeft: '15px', color: COLORS.blue, fontSize: TextThemes['fontSize']['lg'], fontWeight: 'bold'}} href='/'>CovEd</Link>
            {props.links.map(link =>(
              <Link href={link.link} style={{fontFamily: 'Aspira', fontFamily:'sans-serif', paddingRight: '15px', paddingLeft: '15px', color: COLORS.blue, fontSize: TextThemes['fontSize']['sm'], fontWeight: 'normal'}}>
                {link.title}
              </Link>
            ))}
            </Grid>
          <div style={{marginLeft: 'auto'}}/>
          {userLinks}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

NavBar.propTypes = {
  links: PropTypes.object,
  position: PropTypes.string,
}

NavBar.defaultProps = {
  links: [
    {
      title: 'How It Works',
      link: '/howitworks',
    },
    {
      title: 'Resources',
      link: '/resources',
    },
    {
      title: 'FAQs',
      link: '/faqs',
    },
    {
      title: 'Meet Our Team',
      link: '/meetourteam',
    },
    {
      title: 'Contact Us',
      link: '/contact us',
    },
  ],
  position: 'absolute'
}
