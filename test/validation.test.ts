import { describe, expect, it } from 'vitest';
import { NodeseraException } from '../src/errors';
import { RequestParams } from '../src/types';
import { requestValidation, schemes } from '../src/validation';

describe('validation', () => {
  const request = {} as RequestParams;
  for (const scheme of schemes.filter(s => s.required)) {
    it(`throws exception when ${scheme.name} is falsy.`, () => {
      expect(() => requestValidation(request))
        .toThrowError(new NodeseraException(`${scheme.name} is required.`));
      Object.assign(request, { [scheme.name]: '-' });
    });
  }

  it('throws exception when projectid exceeds maximum length.', () => {
    request.projectid = '1234567890123';
    expect(() => requestValidation(request))
      .toThrowError(new NodeseraException('projectid\'s length can\'t be greater than 11.'));
  });
});
