import { createError, getQuery } from 'h3';
import { getProductSeoQuery } from '~/gql/queries/getProductSeo';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default defineCachedEventHandler(async event => {
  const { slug } = getQuery(event);
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' });
  }
  return await requestQuery(getProductSeoQuery, { slug });
}, {
  maxAge: 60 * 5,
  getKey: event => event.req.url!,
});
