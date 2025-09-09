// server/utils/wpgraphql.ts
import { GraphQLClient, type RequestDocument, type Variables } from 'graphql-request';
import { getCookie, setCookie, createError, type H3Event } from 'h3';

let _client: GraphQLClient | null = null;

function client() {
  if (!_client) {
    const { gqlHost } = useRuntimeConfig();
    _client = new GraphQLClient(gqlHost, {
      headers: { 'content-type': 'application/json' },
    });
  }
  return _client;
}

type GqlVars = Variables | undefined;

export async function requestQuery<T = unknown>(query: RequestDocument, variables?: GqlVars): Promise<T> {
  try {
    return await client().request<T>(query, variables);
  } catch (err: any) {
    throw createError({
      statusCode: 502,
      statusMessage: err?.message || 'GraphQL query failed',
    });
  }
}

export async function requestMutation<T = unknown>(event: H3Event, query: RequestDocument, variables?: GqlVars): Promise<T> {
  const cookieName = 'woocommerce-session';
  const session = getCookie(event, cookieName);

  try {
    if (!session) {
      // İlk istek: rawRequest ile header yakala
      const queryString = typeof query === 'string' ? query : (query as any).loc?.source.body;
      const res = await client().rawRequest<T>(queryString, variables);
      const newSession = res.headers.get(cookieName);
      if (newSession) {
        setCookie(event, cookieName, `Session ${newSession}`, { path: '/', httpOnly: true, sameSite: 'lax' });
      }
      return res.data;
    }

    // Var olan session ile normal request
    return await client().request<T>(query, variables, { [cookieName]: session });
  } catch (err: any) {
    throw createError({
      statusCode: 502,
      statusMessage: err?.message || 'GraphQL mutation failed',
    });
  }
}
