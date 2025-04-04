import ComboBox from "../ui/selectbox/ComboBox";

import { GENDER } from "../../constants/apiLocalizationMap";
import { Summary } from "../../types";
import { Controller, useFormContext } from "react-hook-form";

type MySizeGenderBoxProps = {
  genders: Summary[];
};

export default function MySizeGenderBox({ genders }: MySizeGenderBoxProps) {
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
          itemToId={(item) => item?._id || ""}
          itemToText={(item) =>
            item?._id ? `${GENDER[item?.name]}용` : item?.name || ""
          }
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
}
