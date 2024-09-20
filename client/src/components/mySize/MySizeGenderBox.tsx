import ComboBox from '../ui/selectbox/ComboBox';

import useInitialDataStore from '../../hooks/useInitialDataStore';

import { GENDER } from '../../constants/apiLocalizationMap';
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
        ? `${GENDER[item?.name]}용`
        : item?.name || ''
      }
      onChange={(value) => value && changeGender(value)}
    />
  )
}