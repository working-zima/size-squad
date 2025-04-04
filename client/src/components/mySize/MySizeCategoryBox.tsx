import ComboBox from "../ui/selectbox/ComboBox";

import useProductFormStore from "../../hooks/useProductFormStore";

import { nullCategory, nullSummary } from "../../nullObject";

import { CATEGORY, SUBCATEGORY } from "../../constants/apiLocalizationMap";

import { useEffect } from "react";
import { Category } from "../../types";
import { Controller, useFormContext } from "react-hook-form";

type MySizeCategoryBoxProps = {
  categories: Category[];
};

export default function MySizeCategoryBox({
  categories,
}: MySizeCategoryBoxProps) {
  const { control, setValue, watch } = useFormContext();

  const category = watch("category");
  const subCategory = watch("subCategory");

  let subCategories = categories.find(
    (cat) => cat._id === category?._id
  )?.subCategories;

  if (!subCategories?.length) subCategories = [nullSummary];

  useEffect(() => {
    const selectedCategory = categories.find(
      (cat) => cat._id === category?._id
    );

    const isAvailable = selectedCategory?.subCategories.some(
      (sub) => sub._id === subCategory?._id
    );

    if (!isAvailable) {
      setValue(
        "subCategory",
        selectedCategory?.subCategories[0] || nullSummary
      );
    }
  }, [category, subCategory, categories, setValue]);

  return (
    <>
      <Controller
        name="category"
        control={control}
        rules={{ required: "카테고리를 선택해주세요." }}
        render={({ field }) => (
          <ComboBox
            label="카테고리"
            selectedItem={field.value}
            items={categories}
            itemToId={(item) => item?._id || ""}
            itemToText={(item) => CATEGORY[item?.name] || ""}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        name="subCategory"
        control={control}
        rules={{ required: "세부 카테고리를 선택해주세요." }}
        render={({ field }) => (
          <ComboBox
            label="세부 카테고리"
            selectedItem={field.value}
            items={subCategories}
            itemToId={(item) => item?._id || ""}
            itemToText={(item) => SUBCATEGORY[item?.name] || ""}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </>
  );
}
