import { Controller, useFormContext } from 'react-hook-form';

import { FIT } from '../../constants/apiLocalizationMap';
import { Summary } from '../../types';
import ComboBox from '../ui/selectbox/ComboBox';

type ProductFitBoxPorps = {
  fits: Summary[];
};

export default function ProductFitBox({ fits }: ProductFitBoxPorps) {
  const { control } = useFormContext();

  return (
    <Controller
      name="fit"
      control={control}
      render={({ field }) => (
        <ComboBox
          label="의도한 핏"
          selectedItem={field.value}
          items={fits}
          itemToId={(item) => item?._id || ''}
          itemToText={(item) => FIT[item?.name] || ''}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
}
