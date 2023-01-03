import { Base } from '../base';
import { SegmentAnalysisStatus, HttpMethod, WalletsForSegment, ResponseError } from '../../types';

export class SegmentAnalysis extends Base {
  // Returns information if provided wallet address meet rules for given segment
  isSegmentMatched(
    walletAddress: string,
    segmentId: string,
  ): Promise<SegmentAnalysisStatus | ResponseError> {
    return this.request('/personaAnalysis/singlePersona', {
      method: HttpMethod.POST,
      body: JSON.stringify({ walletAddress, segmentId }),
    });
  }
  // Returns wallets that meet the rules in all segments attached to account
  filterMatchedSegments(walletAddresses: string[]): Promise<WalletsForSegment | ResponseError> {
    return this.request('/personaAnalysis/personaArray', {
      method: HttpMethod.POST,
      body: JSON.stringify([...walletAddresses]),
    });
  }
}
