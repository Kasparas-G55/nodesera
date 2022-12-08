export interface RequestParams {
  projectid: string;
  orderid: string;
  accepturl: string;
  cancenlurl: string;
  callbackurl: string;
  version: string;
  lang?: string;
  amount?: string;
  currency?: string;
  payment?: string;
  country?: string;
  paytext?: string;
  p_firstname?: string;
  p_lastname?: string;
  p_email?: string;
  p_street?: string;
  p_city?: string;
  p_state?: string;
  p_zip?: string;
  p_countrycode?: string;
  test?: string;
  only_payments?: string;
  disallow_payments?: string;
  time_limit?: string;
  personcode?: string;
  developerid?: string;
  buyer_consent?: string;
  beneficiary_country?: string;
  beneficiary_town?: string;
  beneficiary_street?: string;
  beneficiary_building?: string;
  beneficiary_postcode?: string;
  beneficiary_country_subdivision?: string;
  beneficiary_bank_name?: string;
  beneficiary_name?: string;
  beneficiary_iban?: string;
  beneficiary_bic?: string;
  periodic_payments_frequency?: string;
  periodic_payments_start_date?: string;
  periodic_payments_end_date?: string;
  [x: string]: string | undefined;
}

export interface ParamScheme {
  name: keyof RequestParams | string;
  maxlen?: number;
  required?: boolean;
  regexp?: RegExp;
}
