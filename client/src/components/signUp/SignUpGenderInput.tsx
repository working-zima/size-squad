import ComboBox from "../ui/ComboBox";

import { Summary } from "../../types";

import { GENDER_MESSAGES } from "../../constants";

type SignUpGenderInputProps = {
  label?: string
  genders: Summary[]
  gender: Summary
  changeGender: (value: Summary) => void;
}

export default function SignUpGenderInput({
  label = "",
  genders,
  gender,
  changeGender
}: SignUpGenderInputProps) {
  return (
    <ComboBox
      label={label}
      selectedItem={gender}
      items={genders}
      itemToId={(item) => item?._id}
      itemToText={(item) => GENDER_MESSAGES[item?.name]}
      onChange={(value) => value && changeGender(value)}
    />
  )
}