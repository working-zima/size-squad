import { useEffect } from 'react';

import styled from 'styled-components';
import { CiCircleRemove } from 'react-icons/ci';

import useProductFormStore from '../../hooks/useProductFormStore';
import useInitialDataStore from '../../hooks/useInitialDataStore';

import TextBox from '../ui/TextBox';
import Button from '../ui/Button';

import { MEASUREMENT_MESSAGES } from '../../constants';

const Metrics = styled.div`
  color: ${props => props.theme.colors.unSelectedText};
`

export default function MySizeNewMeasurements() {
  const [{ category, measurements }, store] = useProductFormStore();
  const [{ categories }] = useInitialDataStore();

  const handleChangeMeasurement = (index: number, value: string) => {
    store.changeMeasurementValue(index, value);
  }

  const handleResetMeasurement = (index: number) => {
    store.changeMeasurementValue(index, '');
  }

  const selectedMeasurements = categories
    .find((categoryElem) => categoryElem._id === category._id)?.measurements || [];

  useEffect(() => {
    store.resetMeasurements()
    selectedMeasurements.forEach((measurement, idx) => {
      store.addMeasurement();
      store.changeMeasurementAndId(idx, measurement._id, measurement.name);
    });
  }, [category, store])

  return (
    <>
      {measurements && measurements
        .map((measurement, index) => (
          <TextBox
            key={measurement._id}
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
