import styled from 'styled-components';
import { CiCircleRemove } from 'react-icons/ci';

import useProductFormStore from '../../hooks/useProductFormStore';

import { key } from '../../utils';

import TextBox from '../ui/TextBox';
import Button from '../ui/Button';

const Metrics = styled.div`
  color: ${props => props.theme.colors.unSelectedText};
`

export default function MySizeNewMeasurements() {
  const [{ measurements }, store] = useProductFormStore();

  const handleResetMeasurement = (index: number) => {
    store.changeMeasurementValue(index, '')
  }

  return (
    <>
      {measurements && measurements
        .map((measurement, index) => (
          <TextBox
            key={key(measurement.name, index)}
            label={measurement.name}
            placeholder={`${measurement.name}을 입력해주세요.`}
            type="text"
            value={measurement.value}
            onChange={(value) => store.changeMeasurementValue(index, value)}
          >
            <Metrics>
              <span>cm</span>
            </Metrics>
            <Button onClick={() => handleResetMeasurement(index)}>
              {!!measurement.value
                && <CiCircleRemove size="18" fill='#6e6e6e'/>
              }
            </Button>
          </TextBox>
        )
        )}
    </>
  )
}
