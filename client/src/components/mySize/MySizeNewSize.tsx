import { useEffect } from 'react';
import useInitialDataStore from '../../hooks/useInitialDataStore';
import useProductFormStore from '../../hooks/useProductFormStore';

import { nullSize } from '../../nullObject';

import ComboBox from '../ui/ComboBox';

export default function MySizeNewSize() {
  const [{ gender, size }, store] = useProductFormStore();
  const [{ sizes }] = useInitialDataStore()

  let sizeList = sizes.filter(sizeElem => {
    return sizeElem.gender._id === gender._id && sizeElem.type._id
  });

  useEffect(() => {
    store.changeSize(sizeList[0]);
  }, [gender])

  if(!sizeList.length) sizeList = [nullSize];

  return (
    <ComboBox
      label="사이즈"
      selectedItem={size}
      items={sizeList}
      itemToId={(item) => item?._id || ''}
      itemToText={(item) => item?.name || ''}
      onChange={(value) => value && store.changeSize(value)}
    />
  )
}