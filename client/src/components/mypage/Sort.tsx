import styled from 'styled-components';

import { SUBCATEGORY } from '../../constants/apiLocalizationMap';
import { SORT_OPTIONS } from '../../constants/constants';
import { SortOption, Summary } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';
import BorderlessComboBox from '../ui/selectbox/BorderlessComboBox';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  font-size: 1.3rem;
  line-height: 20px;
  color: ${(props) => props.theme.colors.unSelectedText};
`;

const ComboBoxWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

type SortProps = {
  totalDocs: number;
  selectedSubCategoryId: string | undefined;
  allSubCategories: Summary[];
  sortOption: SortOption;
  findCategoryById: (value: string) => Summary | undefined;
  handleNavigate: (params: {
    category2DepthCode?: string;
    sortCode?: string;
  }) => void;
  isLoadingCategories: boolean;
};

export default function Sort({
  totalDocs,
  selectedSubCategoryId,
  sortOption,
  allSubCategories,
  isLoadingCategories,
  findCategoryById,
  handleNavigate,
}: SortProps) {
  return (
    <Container>
      {isLoadingCategories ? (
        <LoadingSpinner />
      ) : (
        <>
          <p>Total {totalDocs.toLocaleString()}</p>
          <ComboBoxWrapper>
            <BorderlessComboBox
              selectedItem={findCategoryById(selectedSubCategoryId || '')}
              items={[{ _id: '', name: 'all' }, ...allSubCategories]}
              itemToId={(item) => item?._id || ''}
              itemToText={(item) => SUBCATEGORY[item?.name || '']}
              onChange={(value) => {
                return (
                  value && handleNavigate({ category2DepthCode: value._id })
                );
              }}
            />
            <BorderlessComboBox
              selectedItem={sortOption}
              items={Object.values(SORT_OPTIONS)}
              itemToId={(item) => item?._id || ''}
              itemToText={(item) => item?.name || ''}
              onChange={(value) => {
                return value && handleNavigate({ sortCode: value.urlParam });
              }}
            />
          </ComboBoxWrapper>
        </>
      )}
    </Container>
  );
}
