// server/utils/wpgraphql.ts
import { GraphQLClient, type Variables } from 'graphql-request';
import { getCookie, setCookie, createError, type H3Event } from 'h3';

function getClient(): GraphQLClient {
  const { gqlHost } = useRuntimeConfig();
  return new GraphQLClient(gqlHost, { headers: { 'content-type': 'application/json' } });
}

async function handleError<T>(promise: Promise<T>, message: string): Promise<T> {
  try {
    return await promise;
  } catch (error: any) {
    throw createError({ statusCode: 502, statusMessage: error?.message || message });
  }
}

export async function requestQuery<T = unknown>(query: string, variables?: Variables): Promise<T> {
  return handleError(getClient().request<T>(query, variables), 'GraphQL query failed');
}

export async function requestMutation<T = unknown>(event: H3Event, query: string, variables?: Variables): Promise<T> {
  const session = getCookie(event, 'woocommerce-session');
  const client = getClient();

  if (!session) {
    const res = await handleError(client.rawRequest<T>(query, variables), 'GraphQL mutation failed');
    const newSession = res.headers.get('woocommerce-session');
    if (newSession) {
      setCookie(event, 'woocommerce-session', `Session ${newSession}`, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
      });
    }
    return res.data;
  }

  return handleError(client.request<T>(query, variables, { ['woocommerce-session']: session }), 'GraphQL mutation failed');
}
