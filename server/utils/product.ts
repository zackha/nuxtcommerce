import type { H3Event } from 'h3'
import { getProductQuery } from '~/gql/queries/getProduct'
import { requestQuery } from '~~/server/utils/wpgraphql'

export const getProductCached = defineCachedFunction(async (_event: H3Event, slug?: string, sku?: string) => {
  return await requestQuery(getProductQuery, { slug, sku })
}, {
  maxAge: 60 * 5,
  name: 'product',
  getKey: (_event: H3Event, slug?: string, sku?: string) => slug || sku || 'default',
})
