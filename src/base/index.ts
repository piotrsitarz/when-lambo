import { PersonaAnalysisConfig, RequestInit } from '../types';
import { isWalletAddressValid, areWalletAddressesValid } from '../utils';

export abstract class Base {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: PersonaAnalysisConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.persona.staging.cookie3.co';
  }

  protected async request<T>(endpoint: string, options: RequestInit): Promise<T> {
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

    const validateWalletAddresses = Promise.resolve(
      !!walletAddress ? isWalletAddressValid(walletAddress) : areWalletAddressesValid(body),
    );

    const areValid = await validateWalletAddresses;
    return areValid
      ? fetch(url, config)
          .then((response) => response.text())
          .then((result) => result as T)
          .catch((error) => error)
      : 'incorrect wallet address, please ensure that any wallet address you provide is correct';
  }
}
