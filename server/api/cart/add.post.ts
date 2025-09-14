// server/api/cart/add.post.ts
import { addToCartMutation } from '~/gql/mutations/addToCart';
import { requestMutation } from '~~/server/utils/wpgraphql';

export default defineEventHandler(async event => {
  const body = await readBody(event);
  return await requestMutation(event, addToCartMutation, { input: body });
});
