import { readBody } from 'h3';
import { checkoutMutation } from '~/gql/mutations/checkout';
import { requestMutation } from '~~/server/utils/wpgraphql';

export default defineEventHandler(async event => {
  const body = await readBody(event);
  return await requestMutation(event, checkoutMutation, { input: body });
});
