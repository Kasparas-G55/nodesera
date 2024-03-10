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

/**
 *
 * Decode URLBase64 string to URLSearchParams string.
 *
 * @example 'projectPassword=test&projectid=test&accepturl=test&callbackurl=test&cancelurl=test&orderid=test&version=1.6'
 *
 * @param data Base64URL received from callback.
 *
 * @returns string
 */
export function decodeURLBase64ToString(data: string): string {
  return Buffer.from(data, 'base64url').toString();
}

/**
 *
 * Decode URLBase64 string to RequestParams or any valid URLSearchParams string into an object.
 *
 * @param data Base64URL received from callback.
 *
 * @returns {RequestParams} Request Parameters | T extends object
 */
export function decodeURLBase64<T extends object = RequestParams>(data: string): T {
  const params = new URLSearchParams(decodeURLBase64ToString(data));

  return Object.fromEntries(params.entries()) as T;
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
