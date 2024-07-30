import { CiCircleRemove } from 'react-icons/ci';

import useProductFormStore from '../../hooks/useProductFormStore';

import TextBox from '../ui/TextBox';
import Button from '../ui/Button';

export default function MySizeNameInput() {
  const [{ name }, store] = useProductFormStore();

  const handleChangeName = (value: string) => {
    store.changeName(value);
    store.validateName(value);
  }

  const handleResetName = () => {
    store.changeName('');
  }

  return (
    <TextBox
      label="상품명"
      placeholder="품번 또는 상품명을 입력해주세요."
      type="text"
      value={name}
      onChange={(value) => handleChangeName(value)}
    >
      <Button onClick={handleResetName}>
        {!!name && <CiCircleRemove size="18" fill='#6e6e6e'/>}
      </Button>
    </TextBox>
  )
}