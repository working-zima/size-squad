/* eslint-disable import/prefer-default-export */

/**
 * `${index}-${value}`의 형태의 key를 반환
 * @param '{value, index}'
 * @returns `${index}-${value}`
 */
export function key(value: string, index: number) {
  return `${index}-${value}`;
}
