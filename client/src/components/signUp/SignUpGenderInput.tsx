import { GENDER } from '../../constants/apiLocalizationMap';
import { Summary } from '../../types';
import ComboBox from '../ui/selectbox/ComboBox';

type SignUpGenderInputProps = {
  label?: string;
  genders: Summary[];
  gender: Summary;
  changeGender: (value: Summary) => void;
};

export default function SignUpGenderInput({
  label = '',
  genders,
  gender,
  changeGender,
}: SignUpGenderInputProps) {
  return (
    <ComboBox
      label={label}
      selectedItem={gender}
      items={genders}
      itemToId={(item) => item?._id}
      itemToText={(item) => GENDER[item?.name]}
      onChange={(value) => value && changeGender(value)}
    />
  );
}
