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

interface WalletsForSegment {
  userId: string | null;
  walletsForSegment: SegmentWallet[];
}

interface SegmentWallet {
  segmentId: string;
  walletsMatchingSegment: Wallet[];
  walletsNotMatchingSegment: Wallet[];
  walletsInProcessing: Wallet[];
}

interface Wallet {
  walletAddress: string;
  status: WalletStatus;
}

// 1 - IsMatch, 2 - IsNotMatch, 3 - InProcessing, 4 - ProcessingFailed, 5 - Unavailable
type WalletStatus = 1 | 2 | 3 | 4 | 5;

interface ResponseError {
  type: string;
  title: ResponseErrorTitle;
  status: ResponseErrorStatus;
  description?: string;
}

type ResponseErrorTitle =
  | 'Unauthorized'
  | 'Too Many Requests'
  | 'Unprocessable Entity'
  | 'Internal Server Error';

type ResponseErrorStatus = 401 | 422 | 429 | 500;

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
