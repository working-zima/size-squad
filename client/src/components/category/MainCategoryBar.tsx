import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styled, { css } from 'styled-components';

import Button from '../ui/Button';

import { Category } from '../../types';

import { CATEGORY_MESSAGES } from '../../constants';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 4.7rem;
  margin: 0 0.4rem;
  overflow: auto hidden;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CustomButton = styled(Button) <{ active: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 1.2rem;
  padding: 0;
  height: 100%;
  border: transparent;

  p {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.unSelectedText};
    line-height: 2.3;
    user-select: none;

    ${(props) => props.active && css`
      font-weight: 500;
      color: black;
  `}
  }
`;

const ActiveBar = styled.div<{ left: number, width: number }>`
  position: absolute;
  bottom: 0px;
  z-index: 2;
  height: 2px;
  background-color: black;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
`;

type MainCategoryProps = {
  categories: Category[]
}

export default function MainCategoryBar({
  categories,
}: MainCategoryProps) {
  const navigate = useNavigate();

  const [activeBtn, setActiveBtn] = useState('all');
  const [activeBarStyle, setActiveBarStyle] = useState({ left: 0, width: 0 });

  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category1DepthCode');

    if (categoryId) {
      setActiveBtn(categoryId);
    } else {
      setActiveBtn('all');
    }
  }, [location.search]);

  useEffect(() => {
    const activeElement = buttonsRef.current.find(
      (btn) => btn?.dataset.id === activeBtn,
    );

    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveBarStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeBtn, categories]);

  const handleNavigate = (path: string, btnId: string) => {
    setActiveBtn(btnId);
    navigate(path);
  };

  return (
    <Container>
      <CustomButton
        ref={(elem) => {
          buttonsRef.current[0] = elem;
        }}
        data-id="all"
        active={activeBtn === 'all'}
        onClick={() => handleNavigate('/mysize', 'all')}
      >
        <p>전체</p>
      </CustomButton>
      {!!categories.length && (
        categories.map((category, idx) => (
          <CustomButton
            key={category._id}
            ref={(elem) => {
              buttonsRef.current[idx + 1] = elem;
            }}
            data-id={category._id}
            active={activeBtn === category._id}
            onClick={
              () => handleNavigate(
                `/mysize?category1DepthCode=${category._id}`,
                category._id,
              )
            }
          >
            <p>{CATEGORY_MESSAGES[category.name]}</p>
          </CustomButton>
        ))
      )}
      <ActiveBar
        left={activeBarStyle.left}
        width={activeBarStyle.width}
      />
    </Container>
  );
}
