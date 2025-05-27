import { Controller, useFormContext } from 'react-hook-form';

import { TextInputBox } from '../ui/textbox/TextBoxComponents';

type ProductBrandInputProps = {
  maxLength: number;
};

export default function ProductBrandInput({
  maxLength,
}: ProductBrandInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name="brand"
      control={control}
      rules={{
        required: '브랜드를 입력해주세요.',
        maxLength: {
          value: maxLength,
          message: `${maxLength}자 이하로 입력해주세요.`,
        },
      }}
      render={({ field }) => (
        <TextInputBox
          label="브랜드"
          placeholder="상품의 브랜드를 입력해주세요."
          type="text"
          value={field.value}
          maxLength={maxLength}
          onChange={field.onChange}
          onReset={() => field.onChange('')}
        />
      )}
    />
  );
}
