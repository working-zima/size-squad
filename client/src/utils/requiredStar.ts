import { css } from 'styled-components';

export const requiredStar = (position: 'before' | 'after') => css`
  ${position === 'before'
    ? css`
        &::before {
          content: '*';
          color: ${(props) => props.theme.colors.primaryRed};
        }
      `
    : css`
        &::after {
          content: '*';
          color: ${(props) => props.theme.colors.primaryRed};
        }
      `}
`;
