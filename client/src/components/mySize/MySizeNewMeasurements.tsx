import styled from 'styled-components';
import { CiCircleRemove } from 'react-icons/ci';

import useProductFormStore from '../../hooks/useProductFormStore';

import { key } from '../../utils';

import TextBox from '../ui/TextBox';
import Button from '../ui/Button';

import { MEASUREMENT_MESSAGES } from '../../constants';

const Metrics = styled.div`
  color: ${props => props.theme.colors.unSelectedText};
`

export default function MySizeNewMeasurements() {
  const [{ measurements }, store] = useProductFormStore();

  const handleChangeMeasurement = (index: number, value: string) => {
    store.changeMeasurementValue(index, value)
  }

  const handleResetMeasurement = (index: number) => {
    store.changeMeasurementValue(index, '')
  }

  return (
    <>
      {measurements && measurements
        .map((measurement, index) => (
          <TextBox
            key={key(measurement.name, index)}
            label={MEASUREMENT_MESSAGES[measurement.name]}
            placeholder={`${MEASUREMENT_MESSAGES[measurement.name]}을 입력해주세요.`}
            type="text"
            value={measurement.value}
            onChange={(value) => handleChangeMeasurement(index, value)}
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
