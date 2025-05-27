import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import useCreateUserProduct from '../../hooks/useCreateUserProduct';
import useModal from '../../hooks/useModal';
import { ApiError, InitialData, ProductInputForm, User } from '../../types';
import Button from '../ui/Button';
import { AlertModal } from '../ui/modal/ModalComponents';
import ProductBrandInput from './ProductBrandInput';
import ProductCategoryBox from './ProductCategoryBox';
import ProductDescriptionInput from './ProductDescriptionInput';
import ProductFitBox from './ProductFitBox';
import ProductGenderBox from './ProductGenderBox';
import ProductMeasurementsInput from './ProductMeasurementsInput';
import ProductNameInput from './ProductNameInput';
import ProductSizeBox from './ProductSizeBox';

const Container = styled.div`
  padding: 20px ${(props) => props.theme.sizes.contentPadding} 0;
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
`;

const ButtonWrapper = styled.div`
  button {
    margin: 40px 0 20px 0;
    width: 100%;
    height: 48px;
    background-color: ${(props) => props.theme.colors.primaryBlack};
    color: ${(props) => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    font-weight: 600;
    border-color: ${(props) => props.theme.colors.primaryBlack};
    border-radius: 6px;

    &:disabled {
      background-color: ${(props) => props.theme.colors.unSelectedText};
    }
  }
`;

type ProductNewFormProps = {
  initialData: InitialData;
  user: User;
  onComplete: () => void;
};

export default function ProductNewForm({
  initialData,
  user,
  onComplete,
}: ProductNewFormProps) {
  const { mutateAsync } = useCreateUserProduct();
  const { modalRef, openModal, closeModal } = useModal();
  const [modalMessage, setModalMessage] = useState<string>();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      brand: '',
      name: '',
      category: initialData.categories[0],
      subCategory: initialData.categories[0].subCategories[0],
      gender: user.gender,
      size: initialData.sizes.find((s) => s.gender._id === user.gender?._id)!,
      fit: initialData.fits[0],
      measurements: initialData.categories[0].measurements.map(
        (measurement) => ({
          _id: measurement._id,
          name: measurement.name,
          value: '',
        }),
      ),
      description: '',
    },
  });
  const { isValid } = methods.formState;

  const onSubmit = async (formData: ProductInputForm) => {
    try {
      if (!user._id) return;

      const requestData = {
        author: user._id,
        brand: formData.brand,
        name: formData.name,
        category: formData.category._id,
        subCategory: formData.subCategory._id,
        gender: formData.gender._id,
        size: formData.size._id,
        fit: formData.fit._id,
        measurements: formData.measurements.map((m) => ({
          _id: m._id,
          name: m.name,
          value: Number(m.value),
        })),
        description: formData.description,
      };

      await mutateAsync(requestData);
      onComplete();
    } catch (error) {
      const apiError = error as ApiError;
      setModalMessage(apiError.message ?? '알 수 없는 오류가 발생했습니다.');
      openModal();
    }
  };

  const handleConfirm = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    closeModal();
  };

  return (
    <Container>
      <h2>New Product</h2>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <ProductBrandInput maxLength={29} />
          <ProductNameInput maxLength={29} />
          <ProductCategoryBox categories={initialData.categories} />
          <ProductGenderBox genders={initialData.genders} />
          <ProductSizeBox sizes={initialData.sizes} />
          <ProductMeasurementsInput categories={initialData.categories} />
          <ProductFitBox fits={initialData.fits} />
          <ProductDescriptionInput />
          {/* 등록 버튼 */}
          <ButtonWrapper>
            <Button type="submit" disabled={!isValid}>
              등록
            </Button>
          </ButtonWrapper>
        </Form>
      </FormProvider>
      {/* 에러 안내 모달 */}
      <AlertModal modalRef={modalRef} hide={handleConfirm}>
        <p>수정 실패</p>
        <p>{modalMessage}</p>
      </AlertModal>
    </Container>
  );
}
