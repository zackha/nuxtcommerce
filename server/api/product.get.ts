// server/api/product.get.ts
import { getQuery } from 'h3';
import { getProductQuery } from '~/gql/queries/getProduct';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default cachedEventHandler(
  async event => {
    const { slug, sku } = getQuery(event) as { slug?: string; sku?: string };
    return await requestQuery(getProductQuery, { slug, sku });
  },
  {
    maxAge: 60 * 5,
    swr: true,
    getKey: event => event.req.url!,
  }
);
