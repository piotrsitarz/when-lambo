import {
  PersonaAnalysisConfig,
  RequestInit,
  ResponseError as ResponseErrorType,
} from '../../types';
import { ResponseError } from '../responseError';
import { isWalletAddressValidationPassing } from '../../utils';
import { errorStatuses } from '../../constants';

export abstract class Base {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: PersonaAnalysisConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.persona.staging.cookie3.co';
  }

  private handleError(error: Error): ResponseErrorType {
    try {
      const { type, title, status, description }: ResponseErrorType = JSON.parse(error.message);

      return new ResponseError({
        type,
        title,
        status,
        description,
      });
    } catch (e) {
      // if the error message is not a valid JSON string, return a default error object
      return new ResponseError({
        type: 'https://httpstatuses.com/500',
        title: 'Internal Server Error',
        status: 500,
        description: 'An internal server error occurred',
      });
    }
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit,
  ): Promise<T | ResponseErrorType> {
    const url = `${this.baseUrl}${endpoint}`;
    const body = JSON.parse(options.body);
    const walletAddress = body.walletAddress;

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    };

    const config = {
      ...options,
      headers,
    };

    // we check validation of wallets, if any is invalid we return error and do not make a request to API
    if (!isWalletAddressValidationPassing(walletAddress, body)) {
      return new ResponseError({
        type: 'https://httpstatuses.com/422',
        title: 'Unprocessable Entity',
        status: 422,
        description:
          'incorrect wallet address, please ensure that any wallet address you provide is correct',
      });
    }

    try {
      const response = await fetch(url, config);

      if (errorStatuses.includes(response.status)) {
        throw new Error(JSON.stringify(await response.json()));
      }
      // TODO remove condition when every 2** response will be json - coming soon
      return response.headers.get('Content-Type') === 'text/plain'
        ? (response.json() as T)
        : (response.text() as T);
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}
