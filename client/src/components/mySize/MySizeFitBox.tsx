import useProductFormStore from "../../hooks/useProductFormStore";

import { FIT } from "../../constants/apiLocalizationMap";

import ComboBox from "../ui/selectbox/ComboBox";
import { Summary } from "../../types";

type MySizeFitBoxPorps = {
  fits: Summary[];
};

export default function MySizeFitBox({ fits }: MySizeFitBoxPorps) {
  const [
    {
      product: { fit },
    },
    store,
  ] = useProductFormStore();

  return (
    <ComboBox
      label="의도한 핏"
      selectedItem={fit}
      items={fits}
      itemToId={(item) => item?._id || ""}
      itemToText={(item) => FIT[item?.name] || ""}
      onChange={(value) => value && store.changeFit(value)}
    />
  );
}
