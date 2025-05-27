/**
 * 서버 API 요청 중 발생하는 예외를 표현하는 커스텀 에러
 *
 * 이 클래스는 HTTP 상태 코드(`status`), 서버가 반환한 오류 코드(`code`) 등
 * API 레벨의 에러 정보를 포함하며, 프론트엔드에서 에러 분기 처리 및 사용자 메시지 출력
 *
 * @example
 * throw new ApiException('인증 정보가 유효하지 않습니다.', 401, 'UNAUTHORIZED');
 */
export class ApiException extends Error {
  status?: number;
  code?: string;
  isApiException = true;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;

    Object.setPrototypeOf(this, ApiException.prototype);
  }
}
