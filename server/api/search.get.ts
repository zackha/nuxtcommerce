// server/api/search.get.ts
import { getSearchProductsQuery } from '~/gql/queries/getSearchProducts';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default cachedEventHandler(
  async event => {
    const { search = '' } = getQuery(event) as { search?: string };
    return await requestQuery(getSearchProductsQuery, { search });
  },
  {
    maxAge: 60,
    swr: true,
    getKey: event => event.req.url!,
  }
);
