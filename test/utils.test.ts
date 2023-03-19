import { describe, expect, it } from 'vitest';
import Nodesera from '../src';
import { createRequestBuilder } from '../src/requestbuilder';
import { createURLFromRequest } from '../src/utils';

describe('utils', () => {
  it('should return a paysera url with data and sign queries.', () => {
    const requestBuilder = createRequestBuilder(process.env.VITE_PROJECT_PASSWORD ?? 'test');
    const query = requestBuilder.buildRequest({
      projectid: 'test',
      accepturl: 'test',
      callbackurl: 'test',
      cancelurl: 'test',
      orderid: 'test',
      version: 'test'
    });

    expect(createURLFromRequest(query))
      .toBe(`${Nodesera.PAY_URL}?data=cHJvamVjdGlkPXRlc3QmYWNjZXB0dXJsPXRlc3QmY2FsbGJhY2t1cmw9dGVzdCZjYW5jZWx1cmw9dGVzdCZvcmRlcmlkPXRlc3QmdmVyc2lvbj10ZXN0&sign=623c93b53648ef2bdd1d5f0af4e7554b`);
  });
});
