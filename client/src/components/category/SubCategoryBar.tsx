import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styled, { css } from 'styled-components';

import Button from '../ui/Button';

import { Summary } from '../../types';

import { SUBCATEGORY } from '../../constants/apiLocalizationMap';

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto hidden;
  width: 100%;
  margin: 0 1rem;
  padding: 1rem 0;
  white-space: nowrap;

  scrollbar-width: none; // 파이어폭스
  -ms-overflow-style: none; // 인터넷 익스플로러
  &::-webkit-scrollbar {
    display: none; // 크롬, 사파리, 오페라, 엣지
  }
`;

const SubCategoryButton = styled(Button) <{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3.4rem;
  margin-right: 0.4rem;
  padding: 0.5rem 1.2rem;
  border: 1px solid ${(props) => props.theme.colors.buttonBorderColor};
  border-radius: 100px;
  font-size: 1.3rem;
  line-height: 2.1rem;
  user-select: none;

  ${(props) => props.active && css`
    border: ${props => props.theme.colors.primaryBlack};
    background-color: ${props => props.theme.colors.primaryBlack};
    font-weight: 700;
    color: ${props => props.theme.colors.primaryWhite};
  `}

  &:last-child {
    margin-right: 0;
  }
`;

type SubCategoryBarProps = {
  subCategories: Summary[];
}

export default function SubCategoryBar(
  { subCategories }: SubCategoryBarProps,
) {
  const [activeBtn, setActiveBtn] = useState('all');
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const categoryId = params.get('category1DepthCode');
  const subCategoryId = params.get('category2DepthCode');

  useEffect(() => {
    if (subCategoryId) setActiveBtn(subCategoryId)
    else setActiveBtn('all')
  }, [subCategoryId]);

  const handleNavigate = (btnId: string) => {
    let path = '/mysize';

    if (!!categoryId) path = `${path}?category1DepthCode=${categoryId}`
    if (btnId !== 'all') {
      path = `${path}${categoryId ? '&' : '?'}category2DepthCode=${btnId}`;
    }

    setActiveBtn(btnId);
    navigate(path);
  };

  return (
    <Container>
      <SubCategoryButton
        active={activeBtn === 'all'}
        onClick={() => handleNavigate('all')}
      >
        전체
      </SubCategoryButton>
      {!!subCategories.length && (
        subCategories.map(subCategory => (
          <SubCategoryButton
            key={subCategory._id}
            active={activeBtn === subCategory._id}
            onClick={() => handleNavigate(subCategory._id)}
          >
            {SUBCATEGORY[subCategory.name]}
          </SubCategoryButton>
        ))
      )}
    </Container>
  );
}
