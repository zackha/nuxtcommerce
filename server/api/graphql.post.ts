import { readBody } from 'h3';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default defineEventHandler(async (event) => {
  const { query, variables } = await readBody(event);
  return await requestQuery(query, variables);
});
