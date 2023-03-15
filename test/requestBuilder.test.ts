import { describe, expect, it } from 'vitest';
import { NodeseraException } from '../src/errors';
import { createRequestBuilder } from '../src/requestbuilder';
import { RequestParams } from '../src/types';
import { schemes } from '../src/validation';

describe('build request', () => {
  it('throws exception when project password is falsy.', () => {
    expect(() => createRequestBuilder('')).toThrowError(new NodeseraException('projectPassword is required.'));
  });

  const requestBuilder = createRequestBuilder(process.env.VITE_PROJECT_PASSWORD ?? 'test');
  const request = {} as RequestParams;
  for (const scheme of schemes.filter(s => s.required)) {
    it(`throws exception when ${scheme.name} is falsy.`, () => {
      expect(() => requestBuilder.buildRequest(request))
        .toThrowError(new NodeseraException(`${scheme.name} is required.`));
      Object.assign(request, { [scheme.name]: '-' });
    });
  }

  it('throws exception when one of the values on successful build', () => {
    const request: any = {
      projectid: [],
      orderid: {},
      accepturl: 1,
      cancelurl: () => { /* */ },
      callbackurl: null,
      lang: undefined
    };

    expect(() => requestBuilder.buildRequest(request))
      .toThrowError(new NodeseraException(`[${Object.keys(request).join(', ')}] must be of type string, make sure to stringify POJOs.`));
  });
});
