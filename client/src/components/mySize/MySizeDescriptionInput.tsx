import { TextareaBox } from '../ui/textbox/TextBoxComponents';

import useProductFormStore from '../../hooks/useProductFormStore';
import { useEffect } from 'react';

export default function MySizeNewDescription() {
  const [{ product: { description } }, store] = useProductFormStore();

  const handleChangeDescription = (value: string) => {
    store.changeDescription(value);
  };

  return (
    <TextareaBox
      label="후기"
      placeholder="후기를 입력해주세요."
      maxLength={100}
      value={description}
      onChange={handleChangeDescription}
    />
  )
}
