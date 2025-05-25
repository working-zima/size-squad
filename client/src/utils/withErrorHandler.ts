import { ApiException } from '../api/ApiException';
import { isApiException } from './isApiException';

type AsyncFn<T> = () => Promise<T>;

export async function withErrorHandler<T>(
  fn: AsyncFn<T>,
  onApiError?: (error: ApiException) => void,
  onUnknownError?: (error: unknown) => void,
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    if (isApiException(error)) {
      onApiError?.(error);
    } else {
      console.error('Unknown error:', error);
      onUnknownError?.(error);
    }
    return undefined;
  }
}
