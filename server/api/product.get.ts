import { getQuery } from 'h3';
import { getProductCached } from '~~/server/utils/product';

export default defineEventHandler(async event => {
  const { slug, sku } = getQuery(event);
  return await getProductCached(event, slug as string | undefined, sku as string | undefined);
});
