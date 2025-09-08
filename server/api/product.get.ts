import { getQuery } from 'h3';
import { getProductQuery } from '~/gql/queries/getProduct';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default cachedEventHandler(async event => {
  const { slug, sku } = getQuery(event);
  return await requestQuery(event, getProductQuery, { slug, sku });
}, {
  name: 'api-product',
  maxAge: 60 * 5,
  getKey: event => event.req.url!,
});
