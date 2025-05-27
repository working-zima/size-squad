import { Controller, useFormContext } from 'react-hook-form';

import { TextareaBox } from '../ui/textbox/TextBoxComponents';

export default function ProductDescriptionInput() {
  const { control } = useFormContext();

  return (
    <Controller
      name="description"
      control={control}
      rules={{
        maxLength: {
          value: 100,
          message: '100자 이하로 입력해주세요.',
        },
      }}
      render={({ field }) => (
        <TextareaBox
          label="인사이트"
          placeholder="수선, 스타일링 또는 착용법에 대한 팁을 나눠보세요!"
          maxLength={100}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}
