import { ResponseError } from '../classes/responseError';
import {
  ResponseError as ResponseErrorType,
  PersonaAnalysisStatus,
  WalletsForPersona,
} from '../types';

export const isWalletAddressValid = (walletAddress: string) => {
  const regex = new RegExp(/^0x[a-fA-F0-9]{40}$/);

  return regex.test(walletAddress);
};

export const areWalletAddressesValid = (walletAddresses: string[]) =>
  !walletAddresses.find((walletAddress) => !isWalletAddressValid(walletAddress));

export const isResponseError = (
  response: ResponseErrorType | PersonaAnalysisStatus | WalletsForPersona,
): response is ResponseError => response instanceof ResponseError;

export const isWalletAddressValidationPassing = (walletAddress: string, body: string[]) =>
  !!walletAddress ? isWalletAddressValid(walletAddress) : areWalletAddressesValid(body);
