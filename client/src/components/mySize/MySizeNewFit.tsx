import { FitSummary } from "../../types";

import useProductFormStore from "../../hooks/useProductFormStore";

import ComboBox from "../ui/ComboBox";

type MySizeNewFitProps = {
  fits: FitSummary[]
}

export default function MySizeNewFit({ fits }: MySizeNewFitProps) {
  const [{ fit }, store] = useProductFormStore();

  return (
    <ComboBox
      label="핏"
      selectedItem={fit}
      items={fits}
      itemToId={(item) => item?._id || ''}
      itemToText={(item) => item?.fit || ''}
      onChange={(value) => value && store.changeFit(value)}
    />
  )
}