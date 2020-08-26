import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Wizard from '../Wizard';
import Button from '../Button';
import styled from 'styled-components';
import { COLORS, FONTS } from '../../constants';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Signin from '../SignIn';

const SignUpWizard = ['page1', <Button> Sign up Wizard </Button>, 'page3']

const TextThemes = {
  fontSize: {
    default: 'max(16px,1vw)',
    lg: 'max(24px,1.2vw)',
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
  const [loginOpen, setLoginOpen] = useState(false);

  const toggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const SignUpButton = <Button theme='accent' size='sm'> Sign Up </Button>;
  // TODO: Change the user links based on auth state.
  let loggedInUserLinks = (
      <>
        <Button size='sm' onClick={toggleLogin}>Log In</Button>
        <div/>
        <Modal 
          title='Sign Up' 
          trigger={SignUpButton}>
          <Wizard
            content={SignUpWizard}/> 
        </Modal>
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
              <LinkStyled to={link.link} ver='default' key={link}>
                {link.title}
              </LinkStyled>
            ))}
            </Grid>
          <div style={{ marginLeft: 'auto' }}/>
          {loggedInUserLinks}
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
      link: '/contactus',
    },
  ],
  position: 'sticky',
  ver: 'default',
}
