import { Controller, useFormContext } from "react-hook-form";

import { FIT } from "../../constants/apiLocalizationMap";

import ComboBox from "../ui/selectbox/ComboBox";
import { Summary } from "../../types";

type MySizeFitBoxPorps = {
  fits: Summary[];
};

export default function MySizeFitBox({ fits }: MySizeFitBoxPorps) {
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
          itemToId={(item) => item?._id || ""}
          itemToText={(item) => FIT[item?.name] || ""}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
}
