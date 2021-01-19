import React from 'react';
import styled from 'styled-components';
import Checkbox from '.'

export const MultiCheckBox = ({ content, onChange }) => {
    return (
        <div>
            {{ content }.map((r) => {
                return (
                    <Checkbox name={r} value={false} label={r} onChange={onChange} />
                )
            })}
        </div>
    )
}

export default MultiCheckBox;
