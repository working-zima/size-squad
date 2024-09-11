import { useCallback, useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Pagination from './Pagination';

// 애니메이션 정의
const leftCurrent = keyframes`
  0% {
    left: 0;
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const leftNext = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const rightCurrent = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const rightNext = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

// 스타일 정의
const CarouselWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  height: 180px;
  overflow: hidden;

  .container {
    position: relative;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 130px;
  }

  .item {
    position: absolute;
    top: 0;
    padding: 0;
    margin: 0;
    left: 0;
    width: 100%;
    // 기본적으로 item은 왼쪽으로 숨기기
    transform: translateX(-200%);

    img {
      display: block;
    }

    span {
      position: absolute;
      display: block;
      left: 10px;
      top: 10px;
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 3px 10px;
    }

    &.left_current {
      animation: ${leftCurrent} ease-out 0.3s forwards;
    }

    &.left_next {
      animation: ${leftNext} ease-out 0.3s forwards;
    }

    &.right_current {
      animation: ${rightCurrent} ease-out 0.3s forwards;
    }

    &.right_next {
      animation: ${rightNext} ease-out 0.3s forwards;
    }

    &.current {
      transform: translateX(0);
    }
  }
`;

type CarouselProps<T> = {
  items: T[]
  initialIndex?: number
  renderItem: (data: T) => JSX.Element
}

export const Carousel = <T,>({
  items,
  initialIndex = 0,
  renderItem
}: CarouselProps<T>
) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])

  const moveTo = useCallback((
    nextIndex: number, direction?: 'left' | 'right'
  ) => {
    const $current = itemsRef.current[currentIndex] as HTMLLIElement
    const $next = itemsRef.current[nextIndex] as HTMLLIElement

    // 같은 Pagination 버튼을 클릭할 때는 animation이 없도록(nextIndex가 버튼 누른 인덱스)
    if (nextIndex === currentIndex) return

    // Pagination은 direction이 없음
    const dir = direction || (nextIndex > currentIndex ? 'right' : 'left')

    // 애니메이션이 끝나면 클래스 바꿔주기
    const handleAnimationEnd = () => {
      $current.className = 'item'
      $next.className = 'item current'
      $current.removeEventListener('animationend', handleAnimationEnd)
      setCurrentIndex(nextIndex)
    }
    // animate 효과가 완료된 후 이벤트 발생
    $current.addEventListener('animationend', handleAnimationEnd)

    $current.classList.add(`${dir}_current`)
    $next.classList.add(`${dir}_next`)
  }, [currentIndex])

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [items, initialIndex])

  return (
    <CarouselWrapper>
      <ul className="container">
        {items.map((item, index) => (
          <li
            key={index}
            className={`item ${index === currentIndex ? 'current' : ''}`}
            ref={li => { itemsRef.current[index] = li }}
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={items.length}
        currentIndex={currentIndex}
        visibleCount={8}
        handleMove={moveTo}
      />
    </CarouselWrapper>
  )
}
