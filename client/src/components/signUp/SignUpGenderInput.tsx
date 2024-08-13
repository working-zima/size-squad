import ComboBox from "../ui/ComboBox";

import { Summary } from "../../types";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import { GENDER_MESSAGES } from "../../constants";

type SignUpGenderInputProps = {
  genders: Summary[];
  label?: string
}

export default function SignUpGenderInput({
  genders,
  label=""
}: SignUpGenderInputProps) {
  const [{ user: { gender } }, store] = useSignupFormStore();

  return (
    <ComboBox
      label={label}
      selectedItem={gender}
      items={genders}
      itemToId={(item) => item?._id}
      itemToText={(item) => GENDER_MESSAGES[item?.name]}
      onChange={(value) => value && store.changeGender(value)}
    />
  )
}