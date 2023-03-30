import { describe, expect, it } from 'vitest';
import { NodeseraException } from '../src/errors';
import { createRequestBuilder } from '../src/requestbuilder';
import { RequestParams } from '../src/types';

describe('build request', () => {
  it('throws exception when project password is falsy.', () => {
    expect(() => createRequestBuilder('')).toThrowError(new NodeseraException('projectPassword is required.'));
  });

  const requestBuilder = createRequestBuilder(process.env.VITE_PROJECT_PASSWORD ?? 'test');
  it('throws exception when one of the values is not a string.', () => {
    const request: any = {
      projectid: [],
      orderid: {},
      accepturl: 1,
      cancelurl: () => { /* */ },
      callbackurl: {},
      lang: {}
    };

    expect(() => requestBuilder.buildRequest(request))
      .toThrowError(new NodeseraException(`[${Object.keys(request).join(', ')}] must be of type string, make sure to stringify POJOs.`));
  });

  it('returns query parameters when passing a valid request object.', () => {
    const request: RequestParams = {
      projectid: 'test',
      accepturl: 'test',
      callbackurl: 'test',
      cancelurl: 'test',
      orderid: 'test',
      version: 'test'
    };

    expect(requestBuilder.buildRequest(request))
      .toEqual({
        data: 'cHJvamVjdGlkPXRlc3QmYWNjZXB0dXJsPXRlc3QmY2FsbGJhY2t1cmw9dGVzdCZjYW5jZWx1cmw9dGVzdCZvcmRlcmlkPXRlc3QmdmVyc2lvbj10ZXN0',
        sign: '623c93b53648ef2bdd1d5f0af4e7554b'
      });
  });
});
