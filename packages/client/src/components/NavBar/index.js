import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import Button from '../Button';
import styled from 'styled-components';
import { FONTS, COLORS } from '../../constants';
import MobileNav from './MobileNav';

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

const UserLinkWrapper = styled.div`
  margin-left: auto;
`;

export default function NavBar(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuDropdownAnchor, setMenuDropdownAnchor] = useState(null);
  const handleMenuDropdownClick = (event) => {
    setMenuDropdownAnchor(event.currentTarget);
    event.stopPropagation();
  };
  const handleMenuDropdownClose = () => {
    setMenuDropdownAnchor(null);
  };

  // TODO(mi-yu): conditionally render the logged-in routes
  const userLinks = (
      <>
        <LinkStyled to='/signin' ver='default'>Login</LinkStyled>
        <LinkStyled to='/signup' ver='default'>
          <Button theme='accent' size='sm'>
            Sign Up
          </Button>
        </LinkStyled>
      </>
    );

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    }
  }, []);

  if (windowWidth < 1024) {
    return <MobileNav links={props.links} />
  }

  return (
    <>
      <AppBar color='default' flex-direction='row' position={props.position} elevation={0}>
        <Toolbar>
          <Grid>
            <LinkStyled to='/' ver='lg'>CovEd</LinkStyled>
            <LinkStyled to='#' ver='default' onClick={handleMenuDropdownClick}>How It Works</LinkStyled>
            <Menu
              id="howitworks"
              anchorEl={menuDropdownAnchor}
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
              open={Boolean(menuDropdownAnchor)}
              onClose={handleMenuDropdownClose}
              MenuListProps={{ onMouseLeave: handleMenuDropdownClose }}
            >
              <MenuItem component={LinkStyled} to="/parents">For Parents</MenuItem>
              <MenuItem component={LinkStyled} to="/mentors">For Mentors</MenuItem>
            </Menu>
            {props.links.map(link =>(
              <LinkStyled key={link.link} to={link.link} ver='default'>
                {link.title}
              </LinkStyled>
            ))}
          </Grid>
          <UserLinkWrapper>
            {userLinks}
          </UserLinkWrapper>
        </Toolbar>
      </AppBar>
    </>
  );
}

NavBar.propTypes = {
  links: PropTypes.array,
  position: PropTypes.string,
  ver: PropTypes.string,
}

NavBar.defaultProps = {
  links: [
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
  // sticky: stays with user as they scroll,
  // absolute: disappears after user scrolls past
  position: 'sticky',
  ver: 'default',
}
