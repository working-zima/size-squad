import { Gender } from '../../types';

import useProductFormStore from '../../hooks/useProductFormStore';

import ComboBox from '../ui/ComboBox';

type MySizeNewGenderProps = {
  genders: Gender[];
}

export default function MySizeNewGender({ genders }: MySizeNewGenderProps) {
  const [{ gender }, store] = useProductFormStore();

  return (
    <ComboBox
      label="성별"
      selectedItem={gender}
      items={genders}
      itemToId={(item) => item?._id || ''}
      itemToText={(item) => item?._id
        ? `${item?.gender}용`
        : item?.gender || ''
      }
      onChange={(value) => value && store.changeGender(value)}
    />
  )
}