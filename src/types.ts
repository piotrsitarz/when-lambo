interface PersonaAnalysisConfig {
  apiKey: string;
  baseUrl?: string;
}

interface RequestInit {
  body: string;
  method: HttpMethod;
}

enum HttpMethod {
  POST = 'POST',
}

type PersonaAnalysisStatus =
  | 'Other'
  | 'IsMatch'
  | 'IsNotMatch'
  | 'InProcessing'
  | 'ProcessingFailed'
  | 'Unavailable';

// 0 - Other, 1 - IsMatch, 2 - IsNotMatch, 3 - InProcessing, 4 - ProcessingFailed, 5 - Unavailable
type WalletStatus = 0 | 1 | 2 | 3 | 4 | 5;

interface Wallet {
  walletAddress: string;
  status: WalletStatus;
}

interface PersonaWallet {
  personaId: string;
  walletsMatchingPersona: Wallet[];
  walletsNotMatchingPersona: Wallet[];
  walletsInProcessing: Wallet[];
}

interface WalletsForPersona {
  userId: string | null;
  walletsForPersona: PersonaWallet[];
}

type ResponseErrorTitle = 'Unauthorized' | 'Too Many Requests';
type ResponseErrorStatus = 401 | 429;

interface ResponseError {
  type: string;
  title: ResponseErrorTitle;
  status: ResponseErrorStatus;
}

export type {
  PersonaAnalysisConfig,
  RequestInit,
  PersonaAnalysisStatus,
  WalletsForPersona,
  ResponseError,
};

export { HttpMethod };
