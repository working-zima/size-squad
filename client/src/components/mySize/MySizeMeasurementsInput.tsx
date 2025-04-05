import { useEffect } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import { TextInputBox } from "../ui/textbox/TextBoxComponents";
import { MEASUREMENT } from "../../constants/apiLocalizationMap";

import { Category, ProductInputForm } from "../../types";

type MySizeMeasurementsInputProps = {
  categories: Category[];
};

export default function MySizeMeasurementsInput({
  categories,
}: MySizeMeasurementsInputProps) {
  const { control, watch } = useFormContext<ProductInputForm>();
  const { fields, update, replace } = useFieldArray<ProductInputForm>({
    control,
    name: "measurements",
  });

  const selectedCategory = watch("category");

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
        value: existing?.value ?? "",
      };
    });

    replace(newMeasurements);
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
          onChange={(value) => update(idx, { ...field, value })}
          onReset={() => update(idx, { ...field, value: "" })}
        />
      ))}
    </>
  );
}
