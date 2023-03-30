/**
 * @see {@link https://developers.paysera.com/en/checkout/integrations/integration-library#request-parameters Paysera Request Parameters}
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_PROJECT_ID?: string;
      VITE_PROJECT_PASSWORD?: string;
    }
  }
}

export interface RequiredRequestParams {
  /** Unique project number, generated on project creation. */
  projectid: string;

  /** Unique ID generated by your system. */
  orderid: string;

  /** Full address (URL), to which the client is directed after a successful payment. */
  accepturl: string;

  /** Full address (URL), to which the client is directed after he clicks the link to return to the shop. */
  cancelurl: string;

  /**
   * Full address (URL), to which a seller will get information about performed payment.
   *
   * @note Server must return text *"OK"*. Only then will Paysera register, that information about the payment has been received. If there is no answer *"OK"*, the message will be sent 4 times (after successful payment, after an hour, after three hours and after 24 hours).
   */
  callbackurl: string;

  /** The version number of Paysera's system specification (API). */
  version: string;
}

export interface OptionalRequestParams {
  /** It is possible to indicate the user language (ISO 639-2/B: LIT, RUS, ENG, etc.). If Paysera does not support the selected language, the system will automatically choose a language according to the IP address or ENG language by default. */
  lang?: string;

  /** Amount in cents the client has to pay. */
  amount?: string;

  /** Payment currency (i.e USD, EUR, etc.) you want the client to pay in. If the selected currency cannot be accepted by a specific payment method, the system will convert it automatically to the acceptable currency, according to the currency rate of the day. **payamount** and **paycurrency** answers will be sent to your website. */
  currency?: string;

  /** Payment type. If provided, the payment will be made by the method specified (for example by using the specified bank). If not specified, the payer will be immediately provided with the payment types to choose from. */
  payment?: string;

  /** Payer's country (LT, EE, LV, GB, PL, DE). All possible types of payment in that country are immediately indicated to the payer, after selecting a country. */
  country?: string;

  /**
   * Payment purpose visible when making the payment. If not specified, default text is used:
   *
   * *Payment for goods and services (for nb. [order_nr]) ([site_name]).*
   *
   *
   * ***If*** you specify the payment purpose, it is necessary to include the following variables, which will be replaced with the appropriate values in the final purpose text:
   *
   * *[order_nr] - payment number.*
   *
   * *[site_name] or [owner_name] - website address or company name.*
   */
  paytext?: string;

  /** Payer's name. Requested in the majority of payment methods. Necessary for certain payment methods. */
  p_firstname?: string;

  /** Payer's surname. Requested in the majority of payment methods. Necessary for certain payment methods. */
  p_lastname?: string;

  /** Payer's email address is necessary. If the email address is not received, the client will be requested to enter it. Paysera system will inform the payer about the payment status by this address. */
  p_email?: string;

  /** Payer's address, to which goods will be sent (e.g.: Pilaitės pr. 16). Necessary for certain payment methods. */
  p_street?: string;

  /** Payer's city, to which goods will be sent (e.g.: Vilnius). Necessary for certain payment methods. */
  p_city?: string;

  /** Payer's state code (necessary, when buying in USA). Necessary for certain payment methods. */
  p_state?: string;

  /** Payer's postal code. Necessary for certain payment methods */
  p_zip?: string;

  /** Payer's country code. The list with country codes can be found {@link https://en.wikipedia.org/wiki/ISO_3166-1 here}. Necessary for certain payment methods. */
  p_countrycode?: string;

  /** The parameter, which allows to test the connection. The payment is not executed, but the result is returned immediately, as if the payment has been made. To test, it is necessary to activate the mode for a particular project by logging in and selecting:
   *
   * 1. *Projects and Activities*
   *
   * 2. *My projects*
   *
   * 3. *Project settings*
   *
   * 4. *Payment collection service settings*
   *
   * 5. Enable/Check -> *Allow test payments*
   */
  test?: string;

  /** Show only those payment methods that are separated by commas. */
  only_payments?: string;

  /** Hide payment methods separated by comma. */
  disallow_payments?: string;

  /** The parameter indicating the final date for payment; the date is given in “yyyy-mm-dd HH:MM:SS” format. The minimum value is 15 minutes from the current moment; the maximum value is 3 days. Note: works only with certain payment methods. */
  time_limit?: string;

  /** This parameter can be used for user authentication. If the user’s identification number is transferred, together with callback Paysera will return personcodestatus parameter, which will indicate whether the personal code corresponds to the transferred one. */
  personcode?: string;

  /** In case you are labeled as a developer in Paysera's system, you have to transfer this parameter in your installed project (projects). The value of the parameter - your unique user number. */
  developerid?: string;

  /**
   * Can be set to 0 or 1. If it is set to 1, the payer can skip the additional step where he needs to accept consent using PIS payment.
   *
   * @note Paysera's buyer's consent boilerplate text must be added to your page if this parameter is used.
   */
  buyer_consent?: string;

  /** Beneficiary country (e.g.: LT, EE, LV, GB, PL, DE...). Necessary for certain PIS payment methods. */
  beneficiary_country?: string;

  /** Beneficiary town (e.g.: Vilnius). Necessary for certain PIS payment methods. */
  beneficiary_town?: string;

  /** Beneficiary street (e.g.: Pilaitės pr. 16). Necessary for certain PIS payment methods. */
  beneficiary_street?: string;

  /** Beneficiary building. Necessary for certain PIS payment methods. */
  beneficiary_building?: string;

  /** Beneficiary postal code. Necessary for certain PIS payment methods. */
  beneficiary_postcode?: string;

  /** Beneficiary country subdivision. Necessary for certain PIS payment methods. */
  beneficiary_country_subdivision?: string;

  /** Beneficiary bank name. Necessary for certain PIS payment methods. */
  beneficiary_bank_name?: string;

  /** Beneficiary name. Necessary for certain PIS payment methods. */
  beneficiary_name?: string;

  /** Beneficiary IBAN number to which the payment will be received. Necessary for certain PIS payment methods. */
  beneficiary_iban?: string;

  /** Beneficiary BIC/swift code. Necessary for certain PIS payment methods. */
  beneficiary_bic?: string;

  /** The frequency at which the periodic payment will be performed. */
  periodic_payments_frequency?: string;

  /** The date at which periodic payments will begin. The date format should be yyyy-mm-dd. */
  periodic_payments_start_date?: string;

  /** The date at which periodic payments will end. The date format should be yyyy-mm-dd. */
  periodic_payments_end_date?: string;

  /** Additional request parameter(s) that will be sent back with the **accepturl** and **callbackurl**. */
  [x: string]: string | undefined;
}

type RequestParams = RequiredRequestParams & OptionalRequestParams;
type VerifiedRequestParams = RequiredRequestParams & Record<keyof OptionalRequestParams, string>

export interface ParamScheme {
  name: string;
  maxlen?: number;
  required?: boolean;
}

export type QueryParameters = {
  /** *Base64URL* string containing a stringified *URLSearchParams* object. */
  data: string;

  /** Concatenated *md5* hashed string containing: *data* + *projectPassword*.  */
  sign: string;
}
