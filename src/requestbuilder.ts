import { createHash } from 'node:crypto';
import { NodeseraException } from './errors';
import { Nodesera } from './nodesera';
import { QueryParameters, RequestParams } from './types';
import { encodeURLBase64 } from './utils';
import { requestValidation } from './validation';

export function createRequestBuilder(request: RequestParams) {

  if (!request.projectPassword) {
    throw new NodeseraException('projectPassword is required.');
  }

  return {
    /** Project password used when sending data and receiving it. */
    projectPassword: request.projectPassword,
    data: request,

    /**
     * Builds request parameters.
     *
     * This method validates your request parameters, returns data and sign if valid.
     *
     * @returns {QueryParameters} Query Parameters
     *
     * @throws {NodeseraException}
     */
    buildRequest(): QueryParameters {
      requestValidation(this.data);
      this.data.version = this.data.version ?? Nodesera.VERSION;
      return this.createRequest();
    },

    /**
     * This method encodes your request parameters, creates a md5 hashed sign and returns both in an object.
     *
     * @returns {QueryParameters} Query Parameters
     */
    createRequest(): QueryParameters {
      const data = encodeURLBase64(this.data);
      return {
        data,
        sign: createHash('md5').update(data + this.projectPassword).digest('hex')
      };
    }
  };
}
