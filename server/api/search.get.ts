import { getQuery } from 'h3';
import { getSearchProductsQuery } from '~/gql/queries/getSearchProducts';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default cachedEventHandler(async event => {
  const { search = '' } = getQuery(event);
  return await requestQuery(event, getSearchProductsQuery, { search });
}, {
  name: 'api-search',
  maxAge: 60,
  getKey: event => event.req.url!,
});
