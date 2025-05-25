import { ApiException } from '../api/ApiException';

/**
 * 주어진 에러가 `ApiException` 클래스 또는 유사 구조의 에러인지 여부를 검사합니다.
 *
 * 이 함수는 `instanceof` 체크와 함께, 객체에 `isApiException: true` 속성이 존재하는지도 검사하여,
 * 다양한 상황에서 발생할 수 있는 ApiException을 식별할 수 있습니다.
 *
 * @param error - 검사할 에러 객체
 * @returns 에러가 ApiException 타입이면 `true`, 아니면 `false`
 *
 * @example
 * try {
 *   await someApiCall();
 * } catch (err) {
 *   if (isApiException(err)) {
 *     console.error(err.status); // 안전하게 접근 가능
 *   } else {
 *     console.error('알 수 없는 에러입니다.', err);
 *   }
 * }
 */
export function isApiException(error: unknown): error is ApiException {
  return (
    error instanceof ApiException ||
    (typeof error === 'object' &&
      error !== null &&
      'isApiException' in error &&
      (error as Record<string, unknown>).isApiException === true)
  );
}
