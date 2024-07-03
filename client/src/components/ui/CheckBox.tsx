import React, { useRef } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  margin-block: .5rem;

  label,
  input {
    vertical-align: middle;
  }

  input {
    width: 20px;
    height: 20px;
    accent-color: ${(props) => props.theme.colors.primaryBlack};
  }

  label {
    width: ${(props) => props.theme.sizes.labelWidth};
    padding-left: .5rem;
    text-align: right;
    font-size: 1.4rem;
  }
`;

type CheckBox = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CheckBox({
  label, checked, onChange,
}: CheckBox) {
  const id = useRef(`checkbox-${Math.random().toString().slice(2)}`);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Container>
      <input
        id={id.current}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id.current}>
        {label}
      </label>
    </Container>
  );
}
