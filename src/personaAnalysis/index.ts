import { Base } from '../base';
import { PersonaAnalysisStatus, HttpMethod, WalletsForPersona, ResponseError } from '../types';

export default class PersonaAnalysis extends Base {
  // Returns information if provided wallet address meet rules for given persona
  isPersonaMatched(
    walletAddress: string,
    personaId: string,
  ): Promise<PersonaAnalysisStatus | ResponseError> {
    return this.request('/personaAnalysis/singlePersona', {
      method: HttpMethod.POST,
      body: JSON.stringify({ walletAddress, personaId }),
    });
  }
  // Returns wallets that meet the rules in all personas attached to account
  filterMatchedPersonas(walletAddresses: string[]): Promise<WalletsForPersona | ResponseError> {
    return this.request('/personaAnalysis/personaArray', {
      method: HttpMethod.POST,
      body: JSON.stringify([...walletAddresses]),
    });
  }
}
