interface SegmentAnalysisConfig {
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

type SegmentAnalysisStatus =
  | 'IsMatch'
  | 'IsNotMatch'
  | 'InProcessing'
  | 'ProcessingFailed'
  | 'Unavailable';

// 1 - IsMatch, 2 - IsNotMatch, 3 - InProcessing, 4 - ProcessingFailed, 5 - Unavailable
type WalletStatus = 1 | 2 | 3 | 4 | 5;

interface Wallet {
  walletAddress: string;
  status: WalletStatus;
}

interface SegmentWallet {
  segmentId: string;
  walletsMatchingSegment: Wallet[];
  walletsNotMatchingSegment: Wallet[];
  walletsInProcessing: Wallet[];
}

interface WalletsForSegment {
  userId: string | null;
  walletsForSegment: SegmentWallet[];
}

type ResponseErrorTitle =
  | 'Unauthorized'
  | 'Too Many Requests'
  | 'Unprocessable Entity'
  | 'Internal Server Error';

type ResponseErrorStatus = 401 | 422 | 429 | 500;

interface ResponseError {
  type: string;
  title: ResponseErrorTitle;
  status: ResponseErrorStatus;
  description?: string;
}

export type {
  SegmentAnalysisConfig,
  RequestInit,
  SegmentAnalysisStatus,
  WalletsForSegment,
  ResponseError,
  ResponseErrorTitle,
  ResponseErrorStatus,
};

export { HttpMethod };
