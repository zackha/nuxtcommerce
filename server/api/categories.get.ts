import { getCategoriesQuery } from '~/gql/queries/getCategories';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default cachedEventHandler(async event => {
  return await requestQuery(event, getCategoriesQuery);
}, {
  name: 'api-categories',
  maxAge: 60 * 60,
  getKey: event => event.path,
});
