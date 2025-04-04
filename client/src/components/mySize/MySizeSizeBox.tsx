import { useEffect } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { nullSize } from "../../nullObject";
import { Size } from "../../types";

import ComboBox from "../ui/selectbox/ComboBox";

type MySizeSizeBoxProps = {
  sizes: Size[];
};

export default function MySizeSizeBox({ sizes }: MySizeSizeBoxProps) {
  const { control, watch, setValue } = useFormContext();
  const gender = watch("gender");
  const selectedSize = watch("size");

  let sizeList = sizes.filter((size) => {
    return size.gender._id === gender._id;
  });

  if (!sizeList.length) sizeList = [nullSize];

  useEffect(() => {
    if (!sizeList.some((s) => s._id === selectedSize?._id)) {
      setValue("size", sizeList[0]);
    }
  }, [gender, sizeList, selectedSize, setValue]);

  return (
    <Controller
      name="size"
      control={control}
      render={({ field }) => (
        <ComboBox
          label="사이즈"
          selectedItem={field.value}
          items={sizeList}
          itemToId={(item) => item?._id || ""}
          itemToText={(item) => item?.name || ""}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
}
