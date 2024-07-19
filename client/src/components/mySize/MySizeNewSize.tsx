import { Size } from '../../types';

import useProductFormStore from '../../hooks/useProductFormStore';

import { nullSize } from '../../nullObject';

import ComboBox from '../ui/ComboBox';

type MySizeNewSizeProps = {
  sizes: Size[]
}

export default function MySizeNewSize({ sizes }: MySizeNewSizeProps) {
  const [{ gender, size }, store] = useProductFormStore();

  let genderList = sizes
    .filter(size => size.genderId?._id === gender._id && size.type === '의류');

  if(!genderList.length) genderList = [nullSize];

  return (
    <ComboBox
      label="사이즈 (성별을 먼저 고르세요.)"
      selectedItem={size}
      items={genderList}
      itemToId={(item) => item?._id || ''}
      itemToText={(item) => item?.size || ''}
      onChange={(value) => value && store.changeSize(value)}
    />
  )
}