import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
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
    default: 18,
    lg: 22,
  },
  fontWeight: {
    default: 'normal',
    lg: 'bold',
  }
}

const LinkStyled = styled(Link)`
  font-family: Muli, sans-serif;
  font-color: ${COLORS.blue};
  padding-right: 40px;
  font-size: ${(props) => TextThemes.fontSize[props.ver]}px;
  font-weight: ${(props) => TextThemes.fontWeight[props.ver]};
  text-decoration: none;

  &:link {
    color: ${COLORS.blue};
  }
  &:visited {
    color: ${COLORS.blue};
  }
  &:hover {
    color: ${COLORS.yellow};
    text-decoration: none;
  }
  &:active {
    color: ${COLORS.yellow};
    text-decoration: none;
  }
`

export default function NavBar(props)  {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let menuOpen = false;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    menuOpen = false;
    setAnchorEl(null);
  };

  let userLinks;
  if (false) {
    userLinks = (
      <>
        <LinkStyled href='/login' ver='default'>Login</LinkStyled>
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
        >
          <AccountCircleIcon/>
          <div style={{ padding:'10px' }}/>
          <LinkStyled ver='default' style={{ color: COLORS.blue }}>
            {'Tim Beaver'}
          </LinkStyled>
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
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
        >
          <MenuItem href='/profile' style={{ fontSize: TextThemes.fontSize['default'] }}>Dashboard</MenuItem>
          <MenuItem style={{ color: 'red', fontSize: TextThemes.fontSize['default'] }}>Sign Out</MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <>
      <AppBar color='white' flex-direction='row' position={props.position}>
        <Toolbar>
          <Grid>
            <LinkStyled ver='lg' href='/'>CovEd</LinkStyled>
            {props.links.map(link =>(
              <LinkStyled href={link.link} ver='default'>
                {link.title}
              </LinkStyled>
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
  // sticky: stays with user as they scroll,
  // absolute: disappears after user scrolls past
  position: 'sticky' 
}
