import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../../constants';

const ButtonThemes = {
  backgroundColor: {
    default: COLORS.blue,
    accent: COLORS.yellow,
  },
  width: {
    sm: 120,
    smmd: 140,
    md: 200,
    lg: 264,
  },
  height: {
    sm: 30,
    smmd: 40,
    md: 60,
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
};

const ButtonStyled = styled.button`
  font-family: Roboto;
  min-width: ${(props) => ButtonThemes.width[props.size]}px;
  min-height: ${(props) => ButtonThemes.height[props.size]}px;
  font-size: ${(props) => ButtonThemes.fontSize[props.size]}px;
  margin: 10px;
  border: 1px solid ${(props) => ButtonThemes.backgroundColor[props.theme]};
  color: ${(props) =>
    props.basic ? ButtonThemes.backgroundColor[props.theme] : '#ffffff'};
  cursor: pointer;
  background-color: ${(props) =>
    props.basic ? COLORS.white : ButtonThemes.backgroundColor[props.theme]};
  border-radius: ${(props) =>
    ButtonThemes.borderRadius[props.theme] ||
    ButtonThemes.borderRadius.default}px;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const Button = ({
  children,
  theme = 'default',
  size = 'md',
  basic = false,
  onClick,
}) => {
  return (
    <ButtonStyled theme={theme} size={size} basic={basic} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

Button.propTypes = {
  theme: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  basic: PropTypes.bool,
};
export default Button;
