import { TextInputBox } from '../ui/textbox/TextBoxComponents';

import useProductFormStore from '../../hooks/useProductFormStore';

export default function MySizeBrandInput() {
  const [{ product: { brand } }, store] = useProductFormStore();

  const handleChangeBrand = (value: string) => {
    store.changeBrand(value);
    store.validateBrand(value);
  }

  const handleResetBrand = () => {
    store.changeBrand('');
  }

  return (
    <TextInputBox
      label="브랜드"
      placeholder="상품의 브랜드를 입력해주세요."
      type="text"
      value={brand}
      onChange={(value) => handleChangeBrand(value)}
      onReset={handleResetBrand}
    />
  )
}