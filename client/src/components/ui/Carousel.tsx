import { useCallback, useRef, useState } from "react"

import styled, { keyframes } from "styled-components"
import UserCard from "../UserCard"

type Direction = 'left' | 'right'

const leftCurrent = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`

const leftNext = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`

const rightCurrent = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`

const rightNext = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`

const Carousel1 = styled.div`
  position: relative;
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;
  list-style: none;
  /* width: 600px; */
  height: 260px;
  overflow: hidden;
`

const Container = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 320px;
`

const Item = styled.li<{ isCurrent: boolean; direction?: Direction }>`
  position: absolute;
  top: 0;
  padding: 0;
  margin: 0;
  left: 0;
  transform: ${props => (
    props.isCurrent ? 'translateX(0)' : 'translateX(-200%)'
  )};

  &.left_current {
    animation: ${leftCurrent} 0.3s forwards;
  }

  &.left_next {
    animation: ${leftNext} 0.3s forwards;
  }

  &.right_current {
    animation: ${rightCurrent} 0.3s forwards;
  }

  &.right_next {
    animation: ${rightNext} 0.3s forwards;
  }
`

const NavButton = styled.button<{ isLeft?: boolean }>`
  position: absolute;
  top: 50%;
  margin-top: -20px;
  width: 40px;
  height: 40px;
  background-color: #333;
  border-radius: 50%;
  border: 0;
  outline: 0;
  opacity: 0.3;
  left: ${props => (props.isLeft ? '10px' : 'auto')};
  right: ${props => (!props.isLeft ? '10px' : 'auto')};

  &:hover {
    opacity: 1;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 6px;
    height: 17px;
    background-color: #fff;
    transform-origin: 3px 14px;
    left: ${props => (props.isLeft ? '11px' : 'auto')};
    right: ${props => (!props.isLeft ? '11px' : 'auto')};
    transform: ${props => (props.isLeft ? 'rotate(45deg)' : 'rotate(-45deg)')};
  }

  &::after {
    transform: ${props => (props.isLeft ? 'rotate(135deg)' : 'rotate(-135deg)')};
  }
`

export const Carousel = ({
  datas,
  initialIndex = 0,
}: {
  datas: any[]
  initialIndex?: number
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])

  const moveTo = useCallback((
    nextIndex: number, direction?: Direction
  ) => {
    const $current = itemsRef.current[currentIndex] as HTMLLIElement
    const $next = itemsRef.current[nextIndex] as HTMLLIElement

    // 같은 Pagination 버튼을 클릭할 때는 animation이 없도록(nextIndex가 버튼 누른 인덱스)
    if (nextIndex === currentIndex) return

    // Pagination은 direction이 없음
    const dir = direction || (nextIndex > currentIndex ? 'right' : 'left')

    // 애니메이션이 끝나면 클래스 바꿔주기
    const handleAnimationEnd = () => {
      $current.classList.remove(`${dir}_current`);
      $next.classList.remove(`${dir}_next`);
      $current.removeEventListener('animationend', handleAnimationEnd);
      setCurrentIndex(nextIndex);
    }

    // animate 효과가 완료된 후 이벤트 발생
    $current.addEventListener('animationend', handleAnimationEnd);

    $current.classList.add(`${dir}_current`);
    $next.classList.add(`${dir}_next`);
  }, [currentIndex])

  // 방향 버튼 클릭시 호출
  const move = useCallback((direction: Direction) => {
    const nextIndex = ((
      direction === 'right'
        ? currentIndex + 1
        : currentIndex - 1
    ) + datas.length) % datas.length
    moveTo(nextIndex, direction)
  },
    [datas, currentIndex, moveTo],
  )

  return (
    <Carousel1>
      <Container>
        {datas.map((data, index) => (
          <Item
            key={index}
            isCurrent={index === currentIndex}
            ref={item => { itemsRef.current[index] = item }}
          >
            <UserCard key={data._id} user={data} />
          </Item>
        ))}
      </Container>
      <NavButton isLeft onClick={() => move('left')} />
      <NavButton onClick={() => move('right')} />
    </Carousel1>
  )
}