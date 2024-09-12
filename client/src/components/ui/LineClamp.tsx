import { useEffect, useRef, useState } from 'react';

import styled, { css } from 'styled-components';

type ContentProps = {
  isCollapsed: boolean;
  lines: number;
}

const Content = styled.div<ContentProps>`
  position: relative;
  line-height: 1.67; /* 필수 */
  display: flex;
  flex: 1 1 auto;

  .text {
    white-space: pre-line;
    ${(props) => props.isCollapsed && css`
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${props.lines};
      -webkit-box-orient: vertical;
    `}
  }
`;

const Text = styled.div`
  padding: 0 15px 0 0;
`

const TextClone = styled.div`
  position: absolute;
  box-sizing: border-box;
  left: 10px;
  top: 10px;
  padding: 0 15px 0 0;
  white-space: pre-line;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
`;

type MoreButtonProps = {
  isCollapsed: boolean;
}

const MoreButton = styled.button<MoreButtonProps>`
  position: absolute;
  right: 10px;
  bottom: ${props => props.isCollapsed ? `15px` : `10px`};
  border: 0;
  background-color: transparent;
  width: 5px;
  height: 5px;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;

  /* 밑 화살표 */
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    border-width: 1.2px;
    border-style: solid;
    border-color: transparent #333 #333 transparent;
    transform: ${props => props.isCollapsed
    ? `rotate(45deg)`
    : `rotate(225deg);`
  };
    vertical-align: middle;
  }
`;

type LineClampedText = {
  text: string[];
  lines: number;
  hasButton: boolean;
}

const LineClampedText = ({ text, lines, hasButton }: LineClampedText) => {
  const cloneRef = useRef<HTMLInputElement>(null);
  const elemRef = useRef<HTMLInputElement>(null);
  const [isClamped, setIsClamped] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (elemRef.current && cloneRef.current) {
      const cloneHeight = cloneRef.current.offsetHeight;
      const lineHeight = parseInt(getComputedStyle(elemRef.current).lineHeight);
      setIsClamped(Math.floor(cloneHeight / lineHeight) > (lines || 0));
    }
  }, [lines, text]);

  return (
    <Content
      isCollapsed={isCollapsed}
      lines={lines}
    >
      <TextClone ref={cloneRef}>
        {text}
      </TextClone>
      <Text ref={elemRef} className='text'>
        {text}
      </Text>
      {(isClamped && hasButton)
        && <MoreButton
          isCollapsed={isCollapsed}
          onClick={() => setIsCollapsed(prev => !prev)}
        />
      }
    </Content>
  );
};

export default LineClampedText;