import { useEffect, useState } from 'react';

import { TextInputBox } from '../ui/textbox/TextBoxComponents';

import useProductFormStore from '../../hooks/useProductFormStore';
import useInitialDataStore from '../../hooks/useInitialDataStore';

import { MEASUREMENT_MESSAGES } from '../../constants';

export default function MySizeMeasurementsInput() {
  const [{ product: { category, measurements } }, store] = useProductFormStore();
  const [{ categories }] = useInitialDataStore();
  const [prevCategoryId, setPrevCategoryId] = useState(category._id);

  const handleResetMeasurement = (index: number) => {
    store.changeMeasurementValue(index, '');
  }

  const selectedMeasurements = categories
    .find((categoryElem) => categoryElem._id === category._id)?.measurements
      || [];

  useEffect(() => {
    if (category._id !== prevCategoryId) {
      store.resetMeasurements();

      selectedMeasurements.forEach((measurement, idx) => {
        store.addMeasurement();
        store.changeMeasurementAndId(idx, measurement._id, measurement.name);
      });

      setPrevCategoryId(category._id);
      store.validateMeasurement();
    }
  }, [category._id]);

  return (
    <>
      {measurements && measurements
        .map((measurement, index) => (
          <TextInputBox
            key={measurement._id}
            label={MEASUREMENT_MESSAGES[measurement.name]}
            placeholder={`${MEASUREMENT_MESSAGES[measurement.name]}을 입력해주세요.`}
            type="text"
            maxLength={3}
            value={measurement.value}
            onChange={(value) => store.changeMeasurementValue(index, value)}
            unitType='cm'
            onReset={() => {handleResetMeasurement(index)}}
          />
        )
      )}
    </>
  )
}
