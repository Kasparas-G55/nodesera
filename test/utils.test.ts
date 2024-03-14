import { describe, expect, expectTypeOf, it } from 'vitest';
import { PAY_URL, createNodesera } from '../src/nodesera';
import { createURLFromRequest, decodeURLBase64, decodeURLBase64ToString } from '../src/utils';
import { RequestParams } from '../src/types';

describe('utils', () => {
  const data = 'cHJvamVjdFBhc3N3b3JkPXRlc3QmcHJvamVjdGlkPXRlc3QmYWNjZXB0dXJsPXRlc3QmY2FsbGJhY2t1cmw9dGVzdCZjYW5jZWx1cmw9dGVzdCZvcmRlcmlkPXRlc3QmdmVyc2lvbj0xLjY';
  const sign = '46829ee30ccf42b9467b3a8355a3c8e3';
  const request: RequestParams = {
    projectPassword: 'test',
    projectid: 'test',
    accepturl: 'test',
    callbackurl: 'test',
    cancelurl: 'test',
    orderid: 'test',
    version: '1.6'
  };

  it('should return a paysera url with data and sign queries.', () => {
    const nodesera = createNodesera(request);

    const query = nodesera.createRequest();

    expect(createURLFromRequest(query))
      .toBe(`${PAY_URL}?data=${data}&sign=${sign}`);
  });

  it('should decode base64url data to a string', () => {
    const paramsString = decodeURLBase64ToString(data);

    expectTypeOf(paramsString).toBeString();
    expect(paramsString).toStrictEqual('projectPassword=test&projectid=test&accepturl=test&callbackurl=test&cancelurl=test&orderid=test&version=1.6');
  });

  it('should decode base64url data to a RequestParams object', () => {
    const paramsObject = decodeURLBase64<RequestParams>(data);

    expectTypeOf(paramsObject).toBeObject();
    expectTypeOf(paramsObject).toEqualTypeOf<RequestParams>();
    expect(paramsObject).toMatchObject(request);
  });
});
