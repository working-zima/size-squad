import { CiCircleRemove } from 'react-icons/ci';

import useProductFormStore from '../../hooks/useProductFormStore';

import TextBox from '../ui/TextBox';
import Button from '../ui/Button';

export default function MySizeBrandInput() {
  const [{ brand }, store] = useProductFormStore();

  const handleChangeBrand = (value: string) => {
    store.changeBrand(value);
    store.validateBrand(value);
  }

  const handleResetBrand = () => {
    store.changeBrand('');
  }

  return (
    <TextBox
      label="브랜드"
      placeholder="상품의 브랜드를 입력해주세요."
      type="text"
      value={brand}
      onChange={(value) => handleChangeBrand(value)}
    >
      <Button onClick={handleResetBrand}>
        {!!brand && <CiCircleRemove size="18" fill='#6e6e6e'/>}
      </Button>
    </TextBox>
  )
}