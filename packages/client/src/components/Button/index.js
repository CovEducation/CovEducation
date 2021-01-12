import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS, FONTS } from '../../constants';

const ButtonThemes = {
  backgroundColor: {
    default: COLORS.blue,
    accent: COLORS.yellow,
    light: COLORS.lightblue,
  },
  fontColor: {
    default: COLORS.white,
    acccent: COLORS.white,
    light: COLORS.black,
  },
  width: {
    sm: 120,
    smmd: 140,
    md: 206,
    lg: 264,
  },
  height: {
    sm: 30,
    smmd: 40,
    md: 50,
    lg: 60,
  },
  fontSize: {
    sm: 14,
    smmd: 18,
    md: 18,
    lg: 18,
  },
  borderRadius: {
    default: 5,
    round: 30,
  },
  hover: {
    light: COLORS.lightorange,

  },

};


const ButtonStyled = styled.button`
  font-family: ${FONTS.font1};
  font-weight: 500;
  min-width: ${(props) => ButtonThemes.width[props.size]}px;
  min-height: ${(props) => ButtonThemes.height[props.size]}px;
  font-size: ${(props) => ButtonThemes.fontSize[props.size]}px;
  margin: 10px;
  border: 1px solid ${(props) => 
    props.disabled
      ? COLORS.grey
      : ButtonThemes.backgroundColor[props.theme]
  };
  color: ${(props) =>
    props.basic ? ButtonThemes.backgroundColor[props.theme] : ButtonThemes.fontColor[props.theme]};
  cursor: pointer;
  background-color: ${(props) =>
  props.basic ? COLORS.white
    : (props.disabled
      ? COLORS.grey
      : ButtonThemes.backgroundColor[props.theme]
    )};
  border-radius: ${(props) => props.round ?
    ButtonThemes.borderRadius.round :
    ButtonThemes.borderRadius.default}px;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: ${(props) => props.disabled ? "not-allowed" : "pointer"};
    opacity: ${(props) => props.disabled ? "1.0" : "0.9"};
    background-color: ${(props) =>
    props.basic ? ButtonThemes.backgroundColor[props.theme] : ButtonThemes.hover[props.theme]};
  }
`;

const Button = ({
  children,
  theme = 'default',
  size = 'md',
  basic = false,
  onClick,
  type = 'submit',
  round = false,
  disabled = false,

}) => {
  return (
    <ButtonStyled theme={theme} size={size} basic={basic} onClick={onClick} round={round} disabled={disabled} type={type}>
      {children}
    </ButtonStyled>
  );
};

Button.propTypes = {
  theme: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  basic: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,

};
export default Button;
