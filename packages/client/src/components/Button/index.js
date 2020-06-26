import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonThemes = {
  backgroundColor: {
    default: 'grey',
    accent: 'orange',
  },
  width: {
    sm: 80,
    md: 120,
    lg: 250,
  },
  height: {
    sm: 30,
    md: 45,
    lg: 80,
  },
  fontSize: {
    sm: 14,
    md: 20,
    lg: 28,
  },
};

const ButtonStyled = styled.button`
  font-family: inherit;
  min-width: ${(props) => ButtonThemes.width[props.size]}px;
  min-height: ${(props) => ButtonThemes.height[props.size]}px;
  font-size: ${(props) => ButtonThemes.fontSize[props.size]}px;
  margin: 0;
  border: none;
  color: white;
  cursor: pointer;
  background-color: ${(props) => ButtonThemes.backgroundColor[props.theme]};

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const Button = ({ children, theme, size, onClick }) => {
  return (
    <ButtonStyled theme={theme} size={size} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

Button.propTypes = {
  theme: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

Button.defaultProps = {
  theme: 'default',
  size: 'md',
};

export default Button;
