import { createError, getQuery } from 'h3';
import { getProductQuery } from '~/gql/queries/getProduct';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default defineCachedEventHandler(async event => {
  const { slug, sku } = getQuery(event);
  if (!slug || !sku) {
    throw createError({ statusCode: 400, statusMessage: 'slug and sku are required' });
  }
  return await requestQuery(getProductQuery, { slug, sku });
}, {
  maxAge: 60 * 5,
  getKey: event => event.req.url!,
});
