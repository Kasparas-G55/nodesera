# Nodesera Payment Gateway Integration

This project provides a Node.js library for integrating with the Paysera payment gateway, specifically version 1.6 of their API

**Installation**

Install the required dependencies:

```bash
# npm
npm install nodesera

# yarn
yarn add nodesera

# pnpm
pnpm install nodesera
```

## Usage

1. Create a payment request object with the required parameters:

```ts
const request: RequestParams = {
  projectid: '<YOUR_PROJECT_ID>',
  projectPassword: '<YOUR_PROJECT_PASSWORD>',
  orderid: '<UNIQUE_ORDER_ID>',
  accepturl: 'https://<HOST>/payments/successful'
  cancelurl: 'https://<HOST>/payments/cancel',
  callbackurl: 'https://<HOST>/payments/callback'
  amount: '10.00',
  currency: 'EUR',
  // ...other optional parameters
};
```

2. Create a Nodesera instance and generate the payment request:

```ts
const nodesera = createNodesera(request);
const queryParams = nodesera.createRequest();
```

3. Redirect the user to the payment URL:
```ts
const paymentUrl = createURLFromRequest(queryParams);

// Redirect which ever way your HTTP server framework allows you to.
// Either add `Location` header or send URL to client and redirect there.

// E.g. h3.unjs.io
// This would be at the end of its `eventHandler`
sendRedirect(event, paymentUrl);
```

## Contributing

Please feel free to contribute to this project!

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nodesera?style=flat-square
[npm-version-href]: https://npmjs.com/package/nodesera

[npm-downloads-src]: https://img.shields.io/npm/dm/nodesera?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nodesera
