import { Controller, useFormContext } from 'react-hook-form';

import { TextInputBox } from '../ui/textbox/TextBoxComponents';

type MySizeNameInputProps = {
  maxLength: number;
};

export default function ProductNameInput({ maxLength }: MySizeNameInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name="name"
      control={control}
      rules={{
        required: '상품의 이름을 입력해주세요.',
        maxLength: {
          value: maxLength,
          message: `${maxLength}자 이하로 입력해주세요.`,
        },
      }}
      render={({ field }) => (
        <TextInputBox
          label="상품명"
          placeholder="품번 또는 상품명을 입력해주세요."
          type="text"
          maxLength={maxLength}
          value={field.value}
          onChange={field.onChange}
          onReset={() => field.onChange('')}
        />
      )}
    />
  );
}
