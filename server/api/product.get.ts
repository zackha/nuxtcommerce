import { createError, getQuery } from 'h3';
import { getProductQuery } from '~/gql/queries/getProduct';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default defineCachedEventHandler(async event => {
  const { slug, sku } = getQuery(event);
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' });
  }
  const variables: Record<string, any> = { slug };
  if (sku) variables.sku = sku;
  return await requestQuery(getProductQuery, variables);
}, {
  maxAge: 60 * 5,
  getKey: event => event.req.url!,
});
