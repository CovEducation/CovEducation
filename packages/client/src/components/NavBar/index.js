import React, { useState } from 'react';
// import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Wizard from '../Wizard';
import Button from '../Button';
import styled from 'styled-components';
import { COLORS, FONTS } from '../../constants';

// import { Modal as Md } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Signin from '../SignIn';

const Wiz_content = ['page1', <Button>oh boi</Button>, 'page3']

const TextThemes = {
  fontSize: {
    default: 'max(16px,1vw)',
    lg: 'max(22px,1.2vw)',
  },
  fontWeight: {
    default: '400',
    lg: '700',
  }
}

const LinkStyled = styled(Link)`
  font-family: ${FONTS.font1};
  font-color: ${COLORS.blue};
  padding-right: 40px;
  font-size: ${(props) => TextThemes.fontSize[props.ver]};
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

  // const [anchorEl, setAnchorEl] = useState(null);
  // set the login modal's visibility to false to begin with
  const [loginOpen, setLoginOpen] = useState(false);

  // // not used yet
  // const open = Boolean(anchorEl);
  // let menuOpen = false;

  const toggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  // // not used yet
  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  //
  // // not used yet
  // const handleClose = () => {
  //   menuOpen = false;
  //   setAnchorEl(null);
  // };

  let userLinks;
  userLinks = (
      <>
        <Button size='sm' onClick={toggleLogin}>Log In</Button>
        <div/>
        <Modal title="Sign Up" trigger={<Button theme='accent' size='sm'> Sign Up </Button>}> <Wizard
            content={Wiz_content}/> </Modal>
        <Dialog open={loginOpen} onClose={handleLoginClose}>
          <DialogContent>
            <Signin/>
          </DialogContent>
        </Dialog>
      </>
  );

  return (
    <>
      <AppBar color='white' flex-direction='row' position={props.position} >
        <Toolbar>
          <Grid>
            <LinkStyled to='/' ver='lg'>CovEd</LinkStyled>
            {props.links.map(link =>(
              <LinkStyled to={link.link} ver='default'>
                {link.title}
              </LinkStyled>
            ))}
            </Grid>
          <div style={{ marginLeft: 'auto' }}/>
          {userLinks}
        </Toolbar>
      </AppBar>
    </>
  );
}

NavBar.propTypes = {
  links: PropTypes.object,
  position: PropTypes.string,
  ver: PropTypes.string,
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
  position: 'sticky',
  ver: 'default',
}
