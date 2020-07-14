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

const Checkbox = ({ name, value, label, onChange, ...rest }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    console.log('handle check')
    setChecked(!checked);
    onChange({
      name,
      checked: !checked,
    });
  }

  return (
    <CheckboxWrapper>
      <label htmlFor={name}>
        <CheckboxHiddenInput
          checked={checked}
          onChange={handleCheck}
          type="checkbox"
          value={value}
          name={name}
          {...rest}
        />
        <CustomCheckbox>
          {checked && <Checkmark width={14} height={14} />}
        </CustomCheckbox>
      </label>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxWrapper>
  )
}

export default Checkbox;
