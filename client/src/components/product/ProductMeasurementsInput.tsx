import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { MEASUREMENT } from '../../constants/apiLocalizationMap';
import { Category, ProductInputForm } from '../../types';
import { TextInputBox } from '../ui/textbox/TextBoxComponents';

type ProductMeasurementsInputProps = {
  categories: Category[];
};

export default function ProductMeasurementsInput({
  categories,
}: ProductMeasurementsInputProps) {
  const { control, watch } = useFormContext<ProductInputForm>();
  const { fields, update, replace } = useFieldArray<ProductInputForm>({
    control,
    name: 'measurements',
  });

  const selectedCategory = watch('category');
  const selectedMeasurements =
    categories.find((category) => category._id === selectedCategory?._id)
      ?.measurements ?? [];

  // 카테고리 변경으로 새로운 측정 인풋일 경우 값 초기화
  useEffect(() => {
    if (!selectedMeasurements.length) return;
    const newMeasurements = selectedMeasurements.map((measurement) => {
      const existing = fields.find((field) => field._id === measurement._id);
      return {
        _id: measurement._id,
        name: measurement.name,
        value: existing?.value ?? '',
      };
    });
    replace(newMeasurements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory._id]);

  return (
    <>
      {fields.map((field, idx) => (
        <TextInputBox
          key={field._id}
          label={MEASUREMENT[field.name]}
          placeholder={`${MEASUREMENT[field.name]}을 입력해주세요.`}
          type="text"
          maxLength={5}
          value={field.value}
          unitType="cm"
          onChange={(value) => {
            if (/^\d*\.?\d*$/.test(value)) {
              update(idx, { ...field, value });
            }
          }}
          onReset={() => update(idx, { ...field, value: '' })}
        />
      ))}
    </>
  );
}
