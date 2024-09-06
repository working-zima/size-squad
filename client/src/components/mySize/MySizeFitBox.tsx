import useProductFormStore from "../../hooks/useProductFormStore";
import useInitialDataStore from "../../hooks/useInitialDataStore";

import { FIT_MESSAGES } from "../../constants";

import ComboBox from "../ui/selectbox/ComboBox";

export default function MySizeFitBox() {
  const [{ product: { fit } }, store] = useProductFormStore();
  const [{ fits }] = useInitialDataStore()

  return (
    <ComboBox
      label="의도한 핏"
      selectedItem={fit}
      items={fits}
      itemToId={(item) => item?._id || ''}
      itemToText={(item) => FIT_MESSAGES[item?.name] || ''}
      onChange={(value) => value && store.changeFit(value)}
    />
  )
}