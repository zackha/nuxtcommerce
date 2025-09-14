// server/api/products.get.ts
import { getProductsQuery } from '~/gql/queries/getProducts';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default cachedEventHandler(
  async event => {
    const { after, search, category, order = 'DESC', field = 'DATE' } = getQuery(event) as Record<string, string | undefined>;
    return await requestQuery(getProductsQuery, { after, search, category, order, field });
  },
  {
    maxAge: 60,
    swr: true,
    getKey: event => event.req.url!,
  }
);
