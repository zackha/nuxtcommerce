import { GraphQLClient } from 'graphql-request';
import { getCookie, setCookie, createError } from 'h3';
import type { H3Event } from 'h3';

let client: GraphQLClient;

function getClient() {
  if (!client) {
    client = new GraphQLClient(process.env.GQL_HOST || '');
  }
  return client;
}

export const requestQuery = defineCachedFunction(async (event: H3Event, query: string, variables: any = {}) => {
  try {
    return await getClient().request(query, variables);
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error?.message || 'GraphQL query request failed',
    });
  }
}, {
  name: 'wp-queries',
  maxAge: 60 * 60,
  getKey: (_event, query, variables) => query + JSON.stringify(variables),
});

export async function requestMutation(event: any, query: string, variables: any = {}) {
  const session = getCookie(event, 'woocommerce-session');
  const client = getClient();

  try {
    if (!session) {
      const res = await client.rawRequest(query, variables);
      const newSession = res.headers.get('woocommerce-session');
      if (newSession) {
        setCookie(event, 'woocommerce-session', `Session ${newSession}`, { path: '/' });
      }
      return res.data;
    }

    return await client.request(query, variables, { 'woocommerce-session': session });
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error?.message || 'GraphQL mutation request failed',
    });
  }
}
