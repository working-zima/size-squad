import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";

import MySizeBrandInput from "./MySizeBrandInput";
import MySizeNameInput from "./MySizeNameInput";
import MySizeCategoryBox from "./MySizeCategoryBox";
import MySizeGenderBox from "./MySizeGenderBox";
import MySizeSizeBox from "./MySizeSizeBox";
import MySizeFitBox from "./MySizeFitBox";
import MySizeMeasurementsInput from "./MySizeMeasurementsInput";
import MySizeDescriptionInput from "./MySizeDescriptionInput";

import useProductFormStore from "../../hooks/useProductFormStore";
import useCreateUserProduct from "../../hooks/useCreateUserProduct";

import Button from "../ui/Button";
import useModal from "../../hooks/useModal";
import { AlertModal } from "../ui/modal/ModalComponents";
import { InitialData, ProductInputForm, User } from "../../types";

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

type MySizeNewFormProps = {
  initialData: InitialData;
  user: User;
  onComplete: () => void;
};

export default function MySizeNewForm({
  initialData,
  user,
  onComplete,
}: MySizeNewFormProps) {
  const [
    {
      product: { gender },
      errorMessage,
      valid,
    },
    store,
  ] = useProductFormStore();

  const { modalRef, openModal, closeModal } = useModal();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      brand: "",
      name: "",
      category: initialData.categories[0],
      subCategory: initialData.categories[0].subCategories[0],
      gender: user.gender,
      size: initialData.sizes.find((s) => s.gender._id === user.gender?._id)!,
      fit: initialData.fits[0],
      measurements: initialData.categories[0].measurements.map(
        (measurement) => ({
          _id: measurement._id,
          name: measurement.name,
          value: "",
        })
      ),
      description: "",
    },
  });

  const { isValid } = methods.formState;
  const { mutateAsync } = useCreateUserProduct();

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
      // store.reset();
      onComplete();
    } catch (error) {
      console.log(`error: `, error);
      openModal();
    }
  };

  const handleConfirm = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    store.reset();
    closeModal();
  };

  return (
    <Container>
      <h2>New Product</h2>
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
