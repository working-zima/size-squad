import useProductFormStore from "../../hooks/useProductFormStore";
import useInitialDataStore from "../../hooks/useInitialDataStore";

import { FIT_MESSAGES } from "../../constants";

import ComboBox from "../ui/ComboBox";

export default function MySizeFitBox() {
  const [{ product: { fit } }, store] = useProductFormStore();
  const [{ fits }] = useInitialDataStore()

  return (
    <ComboBox
      label="핏"
      selectedItem={fit}
      items={fits}
      itemToId={(item) => item?._id || ''}
      itemToText={(item) => FIT_MESSAGES[item?.name] || ''}
      onChange={(value) => value && store.changeFit(value)}
    />
  )
}