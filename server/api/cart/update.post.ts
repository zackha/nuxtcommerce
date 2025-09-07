import { readBody } from 'h3';
import { updateItemQuantitiesMutation } from '~/gql/mutations/updateItemQuantities';
import { requestMutation } from '~~/server/utils/wpgraphql';

export default defineEventHandler(async event => {
  const body = await readBody(event);
  return await requestMutation(event, updateItemQuantitiesMutation, { input: body });
});
