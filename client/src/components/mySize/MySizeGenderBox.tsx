import ComboBox from '../ui/selectbox/ComboBox';

import useProductFormStore from '../../hooks/useProductFormStore';
import useInitialDataStore from '../../hooks/useInitialDataStore';

import { GENDER_MESSAGES } from '../../constants';
import { Summary } from '../../types';

type MySizeGenderBoxProps = {
  gender: Summary;
  changeGender: (value: Summary) => void;
}

export default function MySizeGenderBox({
  gender, changeGender
}: MySizeGenderBoxProps) {
  const [{ genders }] = useInitialDataStore()

  return (
    <ComboBox
      label="성별"
      selectedItem={gender}
      items={genders}
      itemToId={(item) => item?._id || ''}
      itemToText={(item) => item?._id
        ? `${GENDER_MESSAGES[item?.name]}용`
        : item?.name || ''
      }
      onChange={(value) => value && changeGender(value)}
    />
  )
}