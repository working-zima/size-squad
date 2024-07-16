import ComboBox from "../ui/ComboBox";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import { Gender } from "../../types";

type SignUpGenderInputProps = {
  genders: Gender[];
}

export default function SignUpGenderInput({ genders }: SignUpGenderInputProps) {
  const [{ gender }, store] = useSignupFormStore();

  return (
    <ComboBox
      label="성별"
      selectedItem={gender}
      items={genders}
      itemToId={(item) => item._id}
      itemToText={(item) => item.gender}
      onChange={(value) => value && store.changeGender(value)}
    />
  )
}