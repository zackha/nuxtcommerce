import { getQuery } from 'h3';
import { getProductsQuery } from '~/gql/queries/getProducts';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default defineCachedEventHandler(async event => {
  const { after, search, category, order = 'DESC', field = 'DATE' } = getQuery(event);
  const variables = { after, search, category, order, field };
  return await requestQuery(getProductsQuery, variables);
}, {
  maxAge: 60,
  name: 'products',
  getKey: event => event.req.url!,
});
