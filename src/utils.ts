import { URLSearchParams } from 'url';
import { NodeseraException } from './errors';
import Nodesera from './nodesera';
import { QueryParameters, RequestParams, VerifiedRequestParams } from './types';

export function encodeURLBase64(request: RequestParams) {
  const invalidParams: string[] = [];
  if (!verifyRequestParams(request, invalidParams)) {
    throw new NodeseraException(`[${invalidParams.join(', ')}] must be of type string, make sure to stringify POJOs.`);
  }

  const params = new URLSearchParams(request).toString();
  return Buffer.from(params).toString('base64url');
}

export function createURLFromRequest(query: QueryParameters) {
  const url = new URL(Nodesera.PAY_URL);
  const searchParams = new URLSearchParams(query);

  url.search = searchParams.toString();
  return url.toString();
}

function verifyRequestParams(request: RequestParams, invalidParams: string[]): request is VerifiedRequestParams {
  for (const param in request) {
    if (typeof request[param] !== 'string') {
      invalidParams.push(param);
    }
  }

  if (invalidParams.length) {
    return false;
  }

  return true;
}
