import { TextareaBox } from '../ui/textbox/TextBoxComponents';

import useProductFormStore from '../../hooks/useProductFormStore';

export default function MySizeNewDescription() {
  const [{ product: { description } }, store] = useProductFormStore();

  const handleChangeDescription = (value: string) => {
    store.changeDescription(value);
  };

  return (
    <TextareaBox
      label="인사이트"
      placeholder="수선, 스타일링 또는 착용법에 대한 팁을 나눠보세요!"
      maxLength={100}
      value={description}
      onChange={handleChangeDescription}
    />
  )
}
