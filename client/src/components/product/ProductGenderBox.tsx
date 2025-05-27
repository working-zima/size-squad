import { Controller, useFormContext } from 'react-hook-form';

import { GENDER } from '../../constants/apiLocalizationMap';
import { Summary } from '../../types';
import ComboBox from '../ui/selectbox/ComboBox';

type ProductGenderBoxProps = {
  genders: Summary[];
};

export default function ProductGenderBox({ genders }: ProductGenderBoxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <ComboBox
          label="성별"
          selectedItem={field.value}
          items={genders}
          itemToId={(item) => item?._id || ''}
          itemToText={(item) =>
            item?._id ? `${GENDER[item?.name]}용` : item?.name || ''
          }
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
}
