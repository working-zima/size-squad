import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styled from 'styled-components';

import useProductsStore from '../hooks/useProductsStore';
import useProductFormStore from '../hooks/useProductFormStore';
import ComboBox from '../components/ui/ComboBox';
import useCategoriesStore from '../hooks/useCategoriesStore';
import useFetchProducts from '../hooks/useFetchProducts';
import useFetchCategories from '../hooks/useFetchCategories';

const Container = styled.div`
  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  [type=submit] {
    display: block;
    margin-block: 1rem;
  }
`;

type FormValues = {
  name: string;
};

export default function MySizeEditPage() {
  // const categoryId = category?.id;

  // useEffect(() => {
  //   useFetchCategories({ categoryId });
  // }, []);

  // const [{
  //   productId, author, name, brand, category, subCategory, size, fits,
  //   measurements, description, error, done,
  // }, store] = useProductFormStore();

  // const [{ categories, subCategories }] = useCategoriesStore();

  // const handleSubmit = async (data: FormValues) => {

  // };

  return (
    <Container>
      <h2>Edit Size</h2>
      {/* <form>
        <ComboBox
          label="카테고리"
          selectedItem={category}
          items={categories}
          itemToId={(item) => item?.id || ''}
          itemToText={(item) => item?.name || ''}
          onChange={(value) => value && store.changeCategory(value)}
        />
      </form> */}
    </Container>
  );
}
