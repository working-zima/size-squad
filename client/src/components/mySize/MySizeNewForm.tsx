import { useEffect } from 'react';

import styled from 'styled-components';
import { CiCircleRemove } from "react-icons/ci";

import { Category, FitSummary, Gender, Size } from '../../types';

import useProductFormStore from '../../hooks/useProductFormStore';

import TextBox from '../ui/TextBox';
import ComboBox from '../ui/ComboBox';
import Button from '../ui/Button';
import { key } from '../../utils';
import { nullSize } from '../../nullObject';

const Container = styled.div`
  padding: 20px ${props => props.theme.sizes.contentPadding} 0;
  user-select: none;

  h2 {
    display: none;
  }
`;

const Form = styled.form`
  & > div {
    margin-top: 0.8rem;
  }

  & > div:first-of-type {
    margin-top: 0;

    label {
      margin-top: 0;
    }
  }
`

const Metrics = styled.div`
  color: ${props => props.theme.colors.unSelectedText};
`

const ButtonWrapper = styled.div`
  button {
    margin: 40px 0 20px 0;
    width: 100%;
    height: 48px;
    background-color: ${props => props.theme.colors.primaryBlack};
    color: ${props => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    font-weight: 600;
    border-color: ${props => props.theme.colors.primaryBlack};
    border-radius: 6px;

    &:disabled {
      background-color: ${props => props.theme.colors.unSelectedText};
    }
  }
`

type MySizeNewFormProps = {
  categories: Category[];
  genders: Gender[];
  fits: FitSummary[]
  sizes: Size[]
  onComplete: () => void;
}

export default function MySizeNewForm({
  categories, genders, fits, sizes, onComplete
}: MySizeNewFormProps) {
  const [{
    author, name, brand, category: selectedCategory, subCategory, gender: selectedGender, size,
    fit, measurements: selectedMeasurements, currentSubCategories, description, error, done, valid
  }, store] = useProductFormStore();

  let genderList = sizes
    .filter(size => size.genderId._id === selectedGender._id && size.type === '의류');

  if(!genderList.length) genderList = [nullSize];

  const measurement = categories
    .find(category => category._id === selectedCategory._id)?.measurements || [];

  useEffect(() => {
    if (done) {
      onComplete();
    }
  }, [done]);

  useEffect(() => {
    store.resetMeasurements();

    measurement.forEach((measurement, idx) => {
      store.addMeasurement();
      store.changeMeasurementName(idx, measurement);
    });

  }, [selectedCategory, store]);

  const handleChangeBrand = (value: string) => {
    store.changeBrand(value);
    store.validateEmail(value);
  }

  const handleResetBrand = () => {
    store.changeBrand('');
  }

  const handleResetName = () => {
    store.changeName('');
  }

  const handleResetMeasurement = (index: number) => {
    store.changeMeasurementValue(index, '')
  }

  const handleChangeDescription = (value: string) => {
    store.changeDescription(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container>
      <h2>New Product</h2>
      <Form onSubmit={handleSubmit}>
        <TextBox
          label="브랜드"
          placeholder="상품의 브랜드를 입력해주세요."
          type="text"
          value={brand}
          onChange={(value) => handleChangeBrand(value)}
        >
          <Button onClick={handleResetBrand}>
            {!!brand && <CiCircleRemove size="18" fill='#6e6e6e'/>}
          </Button>
        </TextBox>
        <TextBox
          label="상품명"
          placeholder="품번 또는 상품명을 입력해주세요."
          type="text"
          value={name}
          onChange={(value) => store.changeName(value)}
        >
          <Button onClick={handleResetName}>
            {!!name && <CiCircleRemove size="18" fill='#6e6e6e'/>}
          </Button>
        </TextBox>
        <ComboBox
          label="카테고리"
          selectedItem={selectedCategory}
          items={categories}
          itemToId={(item) => item?._id || ''}
          itemToText={(item) => item?.category || ''}
          onChange={(value) => value && store.changeCategory(value)}
        />
        <ComboBox
          label="세부 카테고리 (카테고리를 먼저 고르세요.)"
          selectedItem={subCategory}
          items={selectedCategory.subCategories}
          itemToId={(item) => item?._id || ''}
          itemToText={(item) => item?.subCategory || ''}
          onChange={(value) => value && store.changeSubCategory(value)}
        />
        <ComboBox
          label="성별"
          selectedItem={selectedGender}
          items={genders}
          itemToId={(item) => item?._id || ''}
          itemToText={(item) => item?._id
            ? `${item?.gender}용`
            : item?.gender || ''
          }
          onChange={(value) => value && store.changeGender(value)}
        />
        <ComboBox
          label="사이즈 (성별을 먼저 고르세요.)"
          selectedItem={size}
          items={genderList}
          itemToId={(item) => item?._id || ''}
          itemToText={(item) => item?.size || ''}
          onChange={(value) => value && store.changeSize(value)}
        />
        <ComboBox
          label="핏"
          selectedItem={fit}
          items={fits}
          itemToId={(item) => item?._id || ''}
          itemToText={(item) => item?.fit || ''}
          onChange={(value) => value && store.changeFit(value)}
        />
        {selectedMeasurements && selectedMeasurements
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
        <TextBox
          label="후기"
          placeholder="후기를 입력해주세요."
          type="text"
          value={description}
          multiline={true}
          onChange={handleChangeDescription}
        />
        <ButtonWrapper>
          <Button type="submit" disabled={!valid}>
            등록
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}
