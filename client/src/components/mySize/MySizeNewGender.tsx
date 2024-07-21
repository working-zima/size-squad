import ComboBox from '../ui/ComboBox';

import useProductFormStore from '../../hooks/useProductFormStore';
import useInitialDataStore from '../../hooks/useInitialDataStore';

import { GENDER_MESSAGES } from '../../constants';


export default function MySizeNewGender() {
  const [{ gender }, store] = useProductFormStore();
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
      onChange={(value) => value && store.changeGender(value)}
    />
  )
}