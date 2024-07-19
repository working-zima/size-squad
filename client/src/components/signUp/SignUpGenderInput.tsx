import ComboBox from "../ui/ComboBox";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import { GenderSummary } from "../../types";
import { GENDER_MESSAGES } from "../../constants";

type SignUpGenderInputProps = {
  genders: GenderSummary[];
}

export default function SignUpGenderInput({ genders }: SignUpGenderInputProps) {
  const [{ gender }, store] = useSignupFormStore();

  return (
    <ComboBox
      label="성별"
      selectedItem={gender}
      items={genders}
      itemToId={(item) => item?._id}
      itemToText={(item) => GENDER_MESSAGES[item?.name]}
      onChange={(value) => value && store.changeGender(value)}
    />
  )
}