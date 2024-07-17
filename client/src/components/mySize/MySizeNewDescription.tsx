import React from 'react'
import TextBox from '../ui/TextBox';
import useProductFormStore from '../../hooks/useProductFormStore';

export default function MySizeNewDescription() {
  const [{ description }, store] = useProductFormStore();

  const handleChangeDescription = (value: string) => {
    store.changeDescription(value);
  };

  return (
    <TextBox
      label="후기"
      placeholder="후기를 입력해주세요."
      type="text"
      maxLength={100}
      value={description}
      multiline={true}
      onChange={handleChangeDescription}
    />
  )
}
