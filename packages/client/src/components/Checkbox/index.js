import React, { useState } from 'react';
import styled from 'styled-components';

import Checkmark from '../Icons/Checkmark';
import { COLORS } from '../../constants';

const CheckboxWrapper = styled.div`
  padding: 8px;

  label {
    position: relative;
    width: 14px;
    height: 14px;
    display: inline-block;
  }
`;

const CheckboxHiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const CustomCheckbox = styled.span`
  background-color: ${COLORS.white};
  border: 2px solid #E5E5E5;
  height: 14px;
  width: 14px;
  position: absolute;
  cursor: pointer;
`;

const CheckboxLabel = styled.div`
  display: inline-block;
  padding-left: 10px;
`;

/**
 * A basic checkbox component
 *
 * When the checked state changes, the onChange prop
 * will be called with the following object:
 *
 *    {
 *      name: <name from props>,
 *      checked: <checked state>
 *    }
 *
 */
const Checkbox = ({ name, value, label, onChange, ...rest }) => {
  const [checked, setChecked] = useState(false);
  const handleCheck = (event) => {
    const target = event.target;
    const isCheck = target.checked;
    setChecked(isCheck);

    if (onChange instanceof Function) {
      onChange({
        name,
        checked: isCheck,
      });
    }
  }

  return (
    <CheckboxWrapper>
      <label htmlFor={name}>
        <CustomCheckbox>
          {checked && <Checkmark width={14} height={14} />}
        </CustomCheckbox>
        <CheckboxHiddenInput
          checked={checked}
          onChange={handleCheck}
          type='checkbox'
          value={value}
          name={name}
          {...rest}
        />
      </label>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxWrapper>
  )
}

export default Checkbox;
