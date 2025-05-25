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
