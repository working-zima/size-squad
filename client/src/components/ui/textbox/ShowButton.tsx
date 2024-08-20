import { CiRead, CiUnread } from 'react-icons/ci'

import Button from '../Button'

type ShowButtonProps = {
  isShowPw?: boolean;
  handleShowPassword: () => void
}

export default function ShowButton({
  isShowPw,
  handleShowPassword
}: ShowButtonProps) {

  return (
    <Button onClick={handleShowPassword}>
      {isShowPw
        ? <CiRead size="18" fill='#6e6e6e' />
        : <CiUnread size="18" fill='#6e6e6e' />
      }
    </Button>
  )
}
