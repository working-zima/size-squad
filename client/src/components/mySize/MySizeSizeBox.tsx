import useProductFormStore from "../../hooks/useProductFormStore";

import { nullSize } from "../../nullObject";
import { Size } from "../../types";

import ComboBox from "../ui/selectbox/ComboBox";

type MySizeSizeBoxProps = {
  sizes: Size[];
};

export default function MySizeSizeBox({ sizes }: MySizeSizeBoxProps) {
  const [
    {
      product: { gender, size },
    },
    store,
  ] = useProductFormStore();

  let sizeList = sizes.filter((sizeElem) => {
    return sizeElem.gender._id === gender._id;
  });

  if (!sizeList.length) sizeList = [nullSize];

  return (
    <ComboBox
      label="사이즈"
      selectedItem={size}
      items={sizeList}
      itemToId={(item) => item?._id || ""}
      itemToText={(item) => item?.name || ""}
      onChange={(value) => value && store.changeSize(value)}
    />
  );
}
