import { createHash } from 'crypto';
import Nodesera from '.';
import { NodeseraException } from './errors';
import { QueryParameters, RequestParams } from './types';
import { encodeURLBase64 } from './utils';
import { requestValidation } from './validation';

/**
 * @param projectPassword Project password used when sending data and receiving it.
 * Can be found here: {@link https://developers.paysera.com/en/checkout/basic#prepare-integration Paysera Docs}
 */
export function createRequestBuilder(projectPassword: string) {

  if (!projectPassword) {
    throw new NodeseraException('projectPassword is required.');
  }

  return {
    /** Project password used when sending data and receiving it. */
    projectPassword,

    /**
     * Builds request parameters.
     *
     * This method validates your request parameters, returns data and sign if valid.
     *
     * @param request request parameters your *data* query parameter will contain.
     *
     * @returns {QueryParameters} Query Parameters
     *
     * @throws {NodeseraException}
     */
    buildRequest(request: RequestParams): QueryParameters {
      requestValidation(request);
      request.version = request.version ?? Nodesera.VERSION;
      return this.createRequest(request);
    },

    /**
     * This method encodes your request parameters, creates a md5 hashed sign and returns both in an object.
     *
     * @param request request parameters your *data* query parameter will contain.
     *
     * @returns {QueryParameters} Query Parameters
     */
    createRequest(request: RequestParams): QueryParameters {
      const data = encodeURLBase64(request)!;
      return {
        data,
        sign: createHash('md5').update(data + projectPassword).digest('hex')
      };
    }
  };
}
