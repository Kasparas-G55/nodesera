import { describe, expect, expectTypeOf, it } from 'vitest';
import { PAY_URL, createNodesera } from '../src/nodesera';
import { createURLFromRequest, decodeURLBase64, decodeURLBase64ToString } from '../src/utils';
import { RequestParams } from '../src/types';

describe('utils', () => {
  const data = 'cHJvamVjdGlkPXRlc3QmYWNjZXB0dXJsPXRlc3QmY2FsbGJhY2t1cmw9dGVzdCZjYW5jZWx1cmw9dGVzdCZvcmRlcmlkPXRlc3QmdmVyc2lvbj0xLjY';
  const sign = '27302088b8a75d661c312fa0d9d3f2c6';
  const request: RequestParams = {
    projectid: 'test',
    accepturl: 'test',
    callbackurl: 'test',
    cancelurl: 'test',
    orderid: 'test',
    version: '1.6'
  };

  it('should return a paysera url with data and sign queries.', () => {
    const nodesera = createNodesera(request, 'test');

    const query = nodesera.createRequest();

    expect(createURLFromRequest(query))
      .toBe(`${PAY_URL}?data=${data}&sign=${sign}`);
  });

  it('should decode base64url data to a string', () => {
    const paramsString = decodeURLBase64ToString(data);

    expectTypeOf(paramsString).toBeString();
    expect(paramsString).toStrictEqual('projectid=test&accepturl=test&callbackurl=test&cancelurl=test&orderid=test&version=1.6');
  });

  it('should decode base64url data to a RequestParams object', () => {
    const paramsObject = decodeURLBase64<RequestParams>(data);

    expectTypeOf(paramsObject).toBeObject();
    expectTypeOf(paramsObject).toEqualTypeOf<RequestParams>();
    expect(paramsObject).toMatchObject(request);
  });
});
