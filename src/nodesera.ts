import { NodeseraException } from './errors';
import { PayseraProjectPassword, QueryParameters, RequestParams } from './types';
import { encodeURLBase64 } from './utils';
import { requestValidation } from './validation';
import { createHash } from 'node:crypto';

/**
 * Paysera's Latest API version.
 */
export const VERSION = '1.6';

/**
 * Server URL where all requests should go.
 */
export const PAY_URL = 'https://bank.paysera.com/pay';

export function createNodesera(request: RequestParams, projectPassword: PayseraProjectPassword) {

  if (!request.projectid) {
    throw new NodeseraException('projectid is required.');
  }

  if (!projectPassword) {
    throw new NodeseraException('projectPassword is required.');
  }

  request.version ??= VERSION;

  return {
    get data() {
      return request;
    },

    get projectPassword() {
      return projectPassword;
    },

    set data(newRequestParams: RequestParams) {
      this.data = newRequestParams;
    },

    /**
     * This method encodes your request parameters, creates a md5 hashed sign and returns both in an object.
     *
     * @returns {QueryParameters} Query Parameters
     */
    createRequest(): QueryParameters {
      requestValidation(this.data);
      const base64EncodedURL = encodeURLBase64(this.data);

      return {
        data: base64EncodedURL,
        sign: createHash('md5').update(base64EncodedURL + this.projectPassword).digest('hex')
      };
    }
  };
}
