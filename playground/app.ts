import { createApp, createRouter, defineEventHandler, getRequestHost, getRequestURL, readBody, readValidatedBody } from 'h3';
import { createNodesera } from '../src/nodesera';
import { RequestParams } from '../src/types';
import { createRequestBuilder } from '../src/requestbuilder';

export const app = createApp();

const router = createRouter();

app.use(router);

router.get(
  '/',
  defineEventHandler((event) => {
    const host = getRequestHost(event);
    console.log(host);
    return { message: 'H3 is on!', host };
  })
);

router.post(
  '/purchase',
  defineEventHandler(async (event) => {
    const nodesera = createNodesera();
    const host = getRequestHost(event);

    const url = `http://${host}`;

    const requestParams: RequestParams = {
      projectid: '',
      projectPassword: '',
      orderid: '',
      accepturl: `${url}/purchase/successful`,
      cancelurl: `${url}/purchase/cancel`,
      callbackurl: `${url}/purchase/callback`,
      amount: '1',
      currency: 'EUR'
    };

    const requestBuilder = nodesera.buildRequest(requestParams);

    requestBuilder.buildRequest(reque);
  })
);

router.post(
  '/purchase/callback',
  defineEventHandler(async () => {
    const validBody = readValidatedBody();
  })
);
