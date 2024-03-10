import { NodeseraException } from './errors';
import { createRequestBuilder } from './requestbuilder';
import { RequestParams } from './types';

export default class Nodesera {
  /**
   * Paysera's API version.
   */
  public static readonly VERSION = '1.6';

  /**
   * Server URL where all requests should go.
   */
  public static readonly PAY_URL = 'https://bank.paysera.com/pay';

  public buildRequest(request: RequestParams) {
    if (!request.projectid || !request.projectPassword) {
      throw new NodeseraException();
    }

    const requestBuilder = createRequestBuilder(request);

    return requestBuilder.buildRequest();
  }
}
