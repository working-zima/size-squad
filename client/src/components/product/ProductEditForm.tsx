import { MouseEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import useModal from '../../hooks/useModal';
import useProductFormStore from '../../hooks/useProductFormStore';
import useUpdateUserProduct from '../../hooks/useUpdateUserProduct';
import { InitialData, Product, ProductInputForm } from '../../types';
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

type ProductEditFormProps = {
  initialData: InitialData;
  productData: Product;
  onComplete: () => void;
};

export default function ProductEditForm({
  initialData,
  productData,
  onComplete,
}: ProductEditFormProps) {
  const updateProductMutation = useUpdateUserProduct();
  const [{ errorMessage }, store] = useProductFormStore();
  const { modalRef, openModal, closeModal } = useModal();

  const methods = useForm<ProductInputForm>({
    mode: 'onChange',
    defaultValues: {
      brand: productData.brand,
      name: productData.name,
      category: productData.category,
      subCategory: productData.subCategory,
      gender: productData.gender,
      size: productData.size,
      measurements: productData.measurements,
      fit: productData.fit,
      description: productData.description,
    },
  });
  const { isValid } = methods.formState;

  const onSubmit = async (formData: ProductInputForm) => {
    try {
      await updateProductMutation.mutateAsync({
        _id: productData._id,
        author: productData.author._id,
        brand: formData.brand,
        name: formData.name,
        category: formData.category._id,
        subCategory: formData.subCategory._id,
        gender: formData.gender._id,
        size: formData.size._id,
        fit: formData.fit._id,
        description: formData.description,
        measurements: formData.measurements.map((measurement) => ({
          _id: measurement._id || '',
          name: measurement.name,
          value: Number(measurement.value),
        })),
      });

      store.reset();
      onComplete();
    } catch (error) {
      openModal();
    }
  };

  const handleConfirm = (event?: MouseEvent) => {
    if (event) event.preventDefault();
    store.reset();
    closeModal();
  };

  return (
    <Container>
      <h2>Edit Size</h2>
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
          <ButtonWrapper>
            <Button type="submit" disabled={!isValid}>
              등록
            </Button>
          </ButtonWrapper>
        </Form>
      </FormProvider>
      <AlertModal modalRef={modalRef} hide={handleConfirm}>
        <p>수정 실패</p>
        <p>{errorMessage}</p>
      </AlertModal>
    </Container>
  );
}
