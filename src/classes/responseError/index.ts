import {
  ResponseError as ResponseErrorType,
  ResponseErrorTitle,
  ResponseErrorStatus,
} from '../../types';

export class ResponseError implements ResponseErrorType {
  type: string;
  title: ResponseErrorTitle;
  status: ResponseErrorStatus;
  description?: string;

  constructor(responseError: ResponseErrorType) {
    this.type = responseError.type;
    this.title = responseError.title;
    this.status = responseError.status;
    this.description = responseError.description;
  }
}
