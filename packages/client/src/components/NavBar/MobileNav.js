import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { COLORS } from '../../constants';

const MobileMenuIconWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  z-index: 10;
`;

const StyledList = styled(List)`
  width: 250px;
  font-size: 1.5em;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledListItem = styled(ListItem)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const MobileNavLink = styled(Link)`
  color: ${COLORS.black};
  text-decoration: none;

  &:visited {
    color: ${COLORS.black};
  }
`;

const UserLinksWrapper = styled.div`
  margin-top: auto;
`;

const MobileNav = ({ links }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MobileMenuIconWrapper>
        <MenuIcon
          onClick={() => {
            setOpen(true);
          }}
        />
      </MobileMenuIconWrapper>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
      >
        <StyledList>
          <MobileNavLink to='/' onClick={() => setOpen(false)}>
            <StyledListItem>
              Home
            </StyledListItem>
          </MobileNavLink>
          {links.map((link) => (
            <MobileNavLink key={link.link} to={link.link} onClick={() => setOpen(false)}>
              <StyledListItem>
                {link.title}
              </StyledListItem>
            </MobileNavLink>
          ))}
          <UserLinksWrapper>
            <MobileNavLink to='/signin' onClick={() => setOpen(false)}>
              <StyledListItem>
                Login
              </StyledListItem>
            </MobileNavLink>
            <MobileNavLink to='/signup' onClick={() => setOpen(false)}>
              <StyledListItem>
                Register
              </StyledListItem>
            </MobileNavLink>
          </UserLinksWrapper>
        </StyledList>
      </Drawer>
    </>
  )
}

export default MobileNav;