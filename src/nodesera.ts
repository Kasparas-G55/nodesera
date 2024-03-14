import { NodeseraException } from './errors';
import { createRequestBuilder } from './requestbuilder';
import { RequestParams } from './types';
import { verifySignMD5Hash, verifySignRSAKey } from './validation';
import { createURLFromRequest, decodeURLBase64, decodeURLBase64ToString } from './utils';

/**
 * Paysera's Latest API version.
 */
export const VERSION = '1.6';

/**
 * Server URL where all requests should go.
 */
export const PAY_URL = 'https://bank.paysera.com/pay';

export function createNodesera() {

  function buildRequest(request: RequestParams) {
    if (!request.projectid || !request.projectPassword) {
      throw new NodeseraException();
    }

    const requestBuilder = createRequestBuilder(request);

    return requestBuilder.buildRequest();
  }

  return { VERSION, PAY_URL, buildRequest };
}

export { verifySignMD5Hash, verifySignRSAKey, createURLFromRequest, decodeURLBase64, decodeURLBase64ToString };
