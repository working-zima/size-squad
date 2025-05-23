import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-block: 0.5rem;

  label,
  select {
    vertical-align: middle;
  }

  label {
    display: inline-block;
    margin: 12px 0 4px;
    font-size: 1.4rem;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 6px;
  margin-top: 0.8rem;
  height: 50px;
  outline: none;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primaryBlack};
  }

  select {
    box-sizing: border-box;
    border: none;
    border-radius: 6px;
    width: calc(100% - 16px);
    height: 100%;
    margin: 0 8px;
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.unSelectedText};
  }

  select:focus {
    outline: none;
  }
`;

type ComboBoxProps<T> = {
  label: string;
  selectedItem: T;
  items: T[];
  itemToId: (item: T) => string;
  itemToText: (item: T) => string;
  onChange: (item: T | null) => void;
};

/**
 * @param { object } props
 * @param { string } props.label - 콤보박스에 사용될 라벨
 * @param { T } props.selectedItem - 선택된 초기값
 * @param { T[] } props.items - 선택지 객체 배열
 * @param itemToId 선택된 값의 id를 정하는 함수. 예시: (item) => item?._id || ''
 * @param itemToText 선택된 값의 텍스트를 정하는 함수. 예시: (item) => item?.name || ''
 * @param onChange 선택된 값이 바뀔 때 발생할 함수. 예시: (value) => value && store.changeCategory(value)
 */
export default function ComboBox<T>({
  label,
  selectedItem,
  items,
  itemToId,
  itemToText,
  onChange,
}: ComboBoxProps<T>) {
  const id = useRef(`combobox-${Math.random().toString().slice(2)}`);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selected = items.find((item) => itemToId(item) === value);

    onChange(selected ?? null);
  };

  return (
    <Container>
      <label htmlFor={id.current}>{label}</label>
      <SelectWrapper>
        <select
          id={id.current}
          onChange={handleChange}
          value={itemToId(selectedItem)}
        >
          {items.map((item) => (
            <option key={itemToId(item)} value={itemToId(item)}>
              {itemToText(item)}
            </option>
          ))}
        </select>
      </SelectWrapper>
    </Container>
  );
}
