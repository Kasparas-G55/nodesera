import { URLSearchParams } from 'url';
import Nodesera from '.';
import { NodeseraException } from './errors';
import { QueryParameters, RequestParams, VerifiedRequestParams } from './types';

export function encodeURLBase64(request: RequestParams) {
  if (verifyRequestParams(request)) {
    const params = new URLSearchParams(request).toString();
    return Buffer.from(params, 'base64url').toString();
  }
}

export function createURLFromRequest(query: QueryParameters) {
  const url = new URL(Nodesera.PAY_URL);
  const searchParams = new URLSearchParams(query);

  url.search = searchParams.toString();
  return url.toString();
}

export function verifyRequestParams(request: RequestParams): request is VerifiedRequestParams {
  const invalidParams: string[] = [];
  for (const param in request) {
    if (typeof request[param] !== 'string') {
      invalidParams.push(param);
    }
  }

  if (invalidParams.length) {
    throw new NodeseraException(`[${invalidParams.join(', ')}] must be of type string, make sure to stringify POJOs.`);
  }

  return true;
}
