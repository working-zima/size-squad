import {
  useEffect, useRef, useState,
} from 'react';

import styled from 'styled-components';

import Button from './ui/Button';

import { Product } from '../types';

import { debounce } from '../utils';

const Container = styled.div<{ showFull: boolean }>`
  display: flex;
  justify-content: space-between;

  span {
    white-space: ${(props) => (props.showFull ? 'normal' : 'nowrap')};
    overflow: ${(props) => (props.showFull ? 'visible' : 'hidden')};
    text-overflow: ${(props) => (props.showFull ? 'clip' : 'ellipsis')};
  }
`;

const CustomButton = styled(Button)`
  border: none;
  color: ${(props) => props.theme.colors.unSelectedText};
  margin-left: 0.1rem;
  white-space: nowrap;
  font-size: 1.2rem;
`;

type DescriptionProps = {
  product: Product;
}

export default function Description({ product }: DescriptionProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const checkTruncated = () => {
    const descriptionElement = descriptionRef.current;
    if (descriptionElement
      && descriptionElement.scrollWidth > descriptionElement.clientWidth) {
      setIsTruncated(false);
    } else {
      setIsTruncated(true);
    }
  };

  const debouncedCheckTruncated = debounce(checkTruncated, 100);

  useEffect(() => {
    checkTruncated();
    window.addEventListener('resize', debouncedCheckTruncated);

    return () => window.removeEventListener('resize', debouncedCheckTruncated);
  }, [product.description]);

  const handleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Container showFull={showFullDescription}>
      <span ref={descriptionRef}>
        {product.description}
      </span>
      {!isTruncated
    && (
      <CustomButton onClick={handleDescription}>
        {showFullDescription ? '숨기기' : '더보기'}
      </CustomButton>
    )}
    </Container>
  );
}
