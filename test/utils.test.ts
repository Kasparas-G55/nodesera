import { describe, expect, it } from 'vitest';
import Nodesera from '../src/nodesera';
import { createRequestBuilder } from '../src/requestbuilder';
import { createURLFromRequest } from '../src/utils';

describe('utils', () => {
  it('should return a paysera url with data and sign queries.', () => {
    const requestBuilder = createRequestBuilder({
      projectPassword: 'test',
      projectid: 'test',
      accepturl: 'test',
      callbackurl: 'test',
      cancelurl: 'test',
      orderid: 'test',
      version: '1.6'
    });

    const query = requestBuilder.buildRequest();

    expect(createURLFromRequest(query))
      .toBe(`${Nodesera.PAY_URL}?data=cHJvamVjdFBhc3N3b3JkPXRlc3QmcHJvamVjdGlkPXRlc3QmYWNjZXB0dXJsPXRlc3QmY2FsbGJhY2t1cmw9dGVzdCZjYW5jZWx1cmw9dGVzdCZvcmRlcmlkPXRlc3QmdmVyc2lvbj0xLjY&sign=46829ee30ccf42b9467b3a8355a3c8e3`);
  });
});
