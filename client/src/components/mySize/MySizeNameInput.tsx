import { TextInputBox } from '../ui/textbox/TextBoxComponents';

import useProductFormStore from '../../hooks/useProductFormStore';

type MySizeNameInput = {
  maxLength: number;
}

export default function MySizeNameInput({ maxLength }: MySizeNameInput) {
  const [{ product: { name } }, store] = useProductFormStore();

  const handleChangeName = (value: string) => {
    store.changeName(value);
    store.validateName(value);
  }

  const handleResetName = () => {
    store.changeName('');
  }

  return (
    <TextInputBox
      label="상품명"
      placeholder="품번 또는 상품명을 입력해주세요."
      type="text"
      maxLength={maxLength}
      value={name}
      onChange={(value) => handleChangeName(value)}
      onReset={handleResetName}
    />
  )
}