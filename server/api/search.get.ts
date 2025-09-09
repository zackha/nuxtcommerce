// server/api/search.get.ts
import { getQuery } from 'h3';
import { getSearchProductsQuery } from '~/gql/queries/getSearchProducts';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default defineCachedEventHandler(
  async event => {
    const { search = '' } = getQuery(event);
    return await requestQuery(getSearchProductsQuery, { search });
  },
  {
    maxAge: 60,
    getKey: event => event.req.url!,
  }
);
