import { MouseEvent } from "react";

import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";

import MySizeBrandInput from "../mySize/MySizeBrandInput";
import MySizeNameInput from "./MySizeNameInput";
import MySizeCategoryBox from "./MySizeCategoryBox";
import MySizeGenderBox from "./MySizeGenderBox";
import MySizeSizeBox from "./MySizeSizeBox";
import MySizeFitBox from "./MySizeFitBox";
import MySizeMeasurementsInput from "./MySizeMeasurementsInput";
import MySizeDescriptionInput from "./MySizeDescriptionInput";

import useProductFormStore from "../../hooks/useProductFormStore";
import useModal from "../../hooks/useModal";
import useUpdateProduct from "../../hooks/useUpdateProduct";

import Button from "../ui/Button";
import { AlertModal } from "../ui/modal/ModalComponents";

import { InitialData, Product, ProductInputForm } from "../../types";

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

type MySizeEditFormProps = {
  initialData: InitialData;
  productData: Product;
  onComplete: () => void;
};

export default function MySizeEditForm({
  initialData,
  productData,
  onComplete,
}: MySizeEditFormProps) {
  const updateProductMutation = useUpdateProduct();

  const [{ product, valid, errorMessage }, store] = useProductFormStore();

  const { modalRef, openModal, closeModal } = useModal();

  const methods = useForm<ProductInputForm>({
    mode: "onChange",
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

  console.log(`productData.measurements: `, productData.measurements);

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
          _id: measurement._id || "",
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
          <MySizeBrandInput maxLength={29} />
          <MySizeNameInput maxLength={29} />
          <MySizeCategoryBox categories={initialData.categories} />
          <MySizeGenderBox genders={initialData.genders} />
          <MySizeSizeBox sizes={initialData.sizes} />
          <MySizeMeasurementsInput categories={initialData.categories} />
          <MySizeFitBox fits={initialData.fits} />
          <MySizeDescriptionInput />
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
