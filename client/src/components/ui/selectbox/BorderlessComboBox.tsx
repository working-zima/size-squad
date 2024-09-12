import React, { useRef } from 'react';

import styled from 'styled-components';

const SelectWrapper = styled.div`
  display: flex;
  position: relative;
  height: 21px;
  user-select: none;

  select {
    appearance: none;
    position: relative;
    height: 100%;
    padding-right: 22px;
    background-color: transparent;
    border: 0;
    line-height: 20px;
    color: ${props => props.theme.colors.unSelectedText};
    font-size: 1.3rem;
    text-align: right;
    direction: rtl;
    z-index: 10;
  }

  select:focus {
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    right: 2px;
    top: 3px;
    width: 9px;
    height: 9px;
    border-width: 1.2px;
    border-style: solid;
    border-color:
      transparent
      ${props => props.theme.colors.unSelectedText}
      ${props => props.theme.colors.unSelectedText}
      transparent;
    transform: rotate(45deg);
  };
`

type ComboBoxProps<T> = {
  selectedItem: T;
  items: T[];
  itemToId: (item: T) => string;
  itemToText: (item: T) => string;
  onChange: (item: T | null) => void;
}

/**
 * @param { object } props
 * @param { T } props.selectedItem - 선택된 초기값
 * @param { T[] } props.items - 선택지 객체 배열
 * @param itemToId 선택된 값의 id를 정하는 함수. 예시: (item) => item?._id || ''
 * @param itemToText 선택된 값의 텍스트를 정하는 함수. 예시: (item) => item?.name || ''
 * @param onChange 선택된 값이 바뀔 때 발생할 함수. 예시: (value) => value && store.changeCategory(value)
 */
export default function BorderlessComboBox<T>({
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
  );
}
