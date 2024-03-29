import { NodeseraException } from './errors';
import { ParamScheme, RequestParams } from './types';
import { readFile } from 'node:fs/promises';
import { createHash, verify } from 'node:crypto';

export function requestValidation(request: RequestParams) {
  for (const scheme of schemes) {
    const { name, maxlen, required, enums } = scheme;
    const param = request?.[name];


    if (required && !param) {
      throw new NodeseraException(`${name} is required.`);
    }

    if (param && maxlen && param.length > maxlen) {
      throw new NodeseraException(`${name}'s length can't be greater than ${maxlen}.`);
    }

    if (param && enums && !enums.includes(param)) {
      throw new NodeseraException(`${name}'s value must be one of the following "${enums.join(', ')}"`);
    }
  }
}

// TODO: Make test for function.
export function verifySignMD5Hash(data: string, projectPassword: string, ss1: string) {
  return createHash('md5').update(data + projectPassword).toString() === ss1;
}

// TODO: Make test for function.
export async function verifySignRSAKey(data: string, ss2: string) {
  const pubKey = await readFile('./public.key');

  return verify('RSA-SHA1', Buffer.from(data), pubKey, Buffer.from(ss2, 'base64url'));
}

export const schemes: ParamScheme[] = [
  { name: 'projectid', maxlen: 11, required: true },
  { name: 'orderid', maxlen: 40, required: true },
  { name: 'accepturl', maxlen: 255, required: true },
  { name: 'cancelurl', maxlen: 255, required: true },
  { name: 'callbackurl', maxlen: 255, required: true },
  { name: 'version', maxlen: 9, enums: ['1.6', '1.5', '1.4', '1.3', '1.2'] },
  { name: 'lang', maxlen: 3 },
  { name: 'amount', maxlen: 11 },
  { name: 'currency', maxlen: 3 },
  { name: 'payment', maxlen: 20 },
  { name: 'country', maxlen: 2 },
  { name: 'paytext', maxlen: 255 },
  { name: 'p_firstname', maxlen: 255 },
  { name: 'p_lastname', maxlen: 255 },
  { name: 'p_email', maxlen: 255 },
  { name: 'p_street', maxlen: 255 },
  { name: 'p_city', maxlen: 255 },
  { name: 'p_state', maxlen: 255 },
  { name: 'p_zip', maxlen: 20 },
  { name: 'p_countrycode', maxlen: 20 },
  { name: 'test', maxlen: 1 },
  { name: 'only_payments' },
  { name: 'disallow_payments' },
  { name: 'time_limit', maxlen: 19 },
  { name: 'personcode', maxlen: 255 },
  { name: 'developerid', maxlen: 11 },
  { name: 'buyer_consent', maxlen: 1 },
  { name: 'beneficiary_country', maxlen: 255 },
  { name: 'beneficiary_town', maxlen: 255 },
  { name: 'beneficiary_street', maxlen: 255 },
  { name: 'beneficiary_building', maxlen: 255 },
  { name: 'beneficiary_postcode', maxlen: 255 },
  { name: 'beneficiary_country_subdivision', maxlen: 255 },
  { name: 'beneficiary_bank_name', maxlen: 255 },
  { name: 'beneficiary_name', maxlen: 255 },
  { name: 'beneficiary_iban', maxlen: 255 },
  { name: 'beneficiary_bic', maxlen: 255 },
  { name: 'periodic_payments_frequency', maxlen: 255 },
  { name: 'periodic_payments_start_date', maxlen: 10 },
  { name: 'periodic_payments_end_date', maxlen: 10 }
];
