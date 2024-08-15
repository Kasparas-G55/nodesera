import { describe, expect, it } from 'vitest';
import { NodeseraException } from '../src/errors';
import { RequestParams } from '../src/types';
import { createNodesera } from '../src/nodesera';

describe('createNodesera', () => {
  const request: any = {
    projectid: [],
    orderid: {},
    accepturl: 1,
    cancelurl: () => { /* */ },
    callbackurl: {},
    lang: {}
  };

  it('throws exception when project password is falsy.', () => {
    expect(() => createNodesera(request, '')).toThrowError(new NodeseraException('projectPassword is required.'));
  });

  it('throws exception when project id is falsy.', () => {
    request.projectid = '',
    expect(() => createNodesera(request, 'test')).toThrowError(new NodeseraException('projectid is required.'));
  });

  it('throws exception when one of the values don\'t match their enums.', () => {
    request.projectid = 'test',
    request.version = 'test';
    const nodesera = createNodesera(request, 'test');

    expect(() => nodesera.createRequest())
      .toThrowError(new NodeseraException('version\'s value must be one of the following "1.6, 1.5, 1.4, 1.3, 1.2"'));
  });

  it('throws exception when one of the values is not a string.', () => {
    request.projectid = {};

    const nodesera = createNodesera(request, 'test');

    delete nodesera.data.version;

    expect(() => nodesera.createRequest())
      .toThrowError(new NodeseraException(`[${Object.keys(request).join(', ')}] must be of type string, make sure to stringify POJOs.`));
  });


  it('returns query parameters when passing a valid request object.', () => {
    const request: RequestParams = {
      projectid: 'test',
      accepturl: 'test',
      callbackurl: 'test',
      cancelurl: 'test',
      orderid: 'test',
      version: '1.6'
    };

    const nodesera = createNodesera(request, 'test');

    expect(nodesera.createRequest())
      .toEqual({
        data: 'cHJvamVjdGlkPXRlc3QmYWNjZXB0dXJsPXRlc3QmY2FsbGJhY2t1cmw9dGVzdCZjYW5jZWx1cmw9dGVzdCZvcmRlcmlkPXRlc3QmdmVyc2lvbj0xLjY',
        sign: '27302088b8a75d661c312fa0d9d3f2c6'
      });
  });
});
