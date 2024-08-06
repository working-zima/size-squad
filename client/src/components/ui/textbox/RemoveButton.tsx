import { CiCircleRemove } from 'react-icons/ci'

import Button from '../Button'

type RemoveButtonProps = {
  onReset: () => void;
}

export default function RemoveButton({ onReset }: RemoveButtonProps) {
  return (
    <Button onClick={onReset}>
      <CiCircleRemove size="18" fill='#6e6e6e' />
    </Button>
  )
}
