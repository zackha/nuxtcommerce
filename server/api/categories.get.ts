import { getCategoriesQuery } from '~/gql/queries/getCategories';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default defineCachedEventHandler(async () => {
  return await requestQuery(getCategoriesQuery);
}, {
  maxAge: 60 * 60,
});
