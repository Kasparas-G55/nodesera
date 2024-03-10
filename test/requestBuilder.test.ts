import { describe, expect, it } from 'vitest';
import { NodeseraException } from '../src/errors';
import { createRequestBuilder } from '../src/requestbuilder';
import { RequestParams } from '../src/types';

describe('build request', () => {
  const request: any = {
    projectPassword: '',
    projectid: [],
    orderid: {},
    accepturl: 1,
    cancelurl: () => { /* */ },
    callbackurl: {},
    lang: {}
  };

  it('throws exception when project password is falsy.', () => {
    expect(() => createRequestBuilder(request)).toThrowError(new NodeseraException('projectPassword is required.'));
  });


  it('throws exception when one of the values don\'t match their enums.', () => {
    request.projectPassword = 'test';
    request.version = 'test';
    const requestBuilder = createRequestBuilder(request);

    expect(() => requestBuilder.buildRequest())
      .toThrowError(new NodeseraException('version\'s value must be one of the following "1.6, 1.5, 1.4, 1.3, 1.2"'));
  });

  it('throws exception when one of the values is not a string.', () => {
    delete request.version;
    request.projectPassword = {};

    const requestBuilder = createRequestBuilder(request);

    expect(() => requestBuilder.buildRequest())
      .toThrowError(new NodeseraException(`[${Object.keys(request).join(', ')}] must be of type string, make sure to stringify POJOs.`));
  });


  it('returns query parameters when passing a valid request object.', () => {
    const request: RequestParams = {
      projectPassword: 'test',
      projectid: 'test',
      accepturl: 'test',
      callbackurl: 'test',
      cancelurl: 'test',
      orderid: 'test',
      version: '1.6'
    };
    const requestBuilder = createRequestBuilder(request);

    expect(requestBuilder.buildRequest())
      .toEqual({
        data: 'cHJvamVjdFBhc3N3b3JkPXRlc3QmcHJvamVjdGlkPXRlc3QmYWNjZXB0dXJsPXRlc3QmY2FsbGJhY2t1cmw9dGVzdCZjYW5jZWx1cmw9dGVzdCZvcmRlcmlkPXRlc3QmdmVyc2lvbj0xLjY',
        sign: '46829ee30ccf42b9467b3a8355a3c8e3'
      });
  });
});
