import {
  PersonaAnalysisConfig,
  RequestInit,
  ResponseError as ResponseErrorType,
} from '../../types';
import { ResponseError } from '../responseError';
import { isWalletAddressValid, areWalletAddressesValid } from '../../utils';

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
      // If the error message is not a valid JSON string, return a default error object
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

    const validateWalletAddresses = !!walletAddress
      ? isWalletAddressValid(walletAddress)
      : areWalletAddressesValid(body);

    const areWalletsValid = validateWalletAddresses;

    if (!areWalletsValid) {
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

      if (response.status === 401) {
        throw new Error(JSON.stringify(await response.json()));
      }

      return response.json() as T;
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}
