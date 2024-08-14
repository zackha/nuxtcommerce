import { LRUCache } from 'lru-cache';
import { hash as ohash } from 'ohash';
import { getProductsQuery } from '~/gql/queries/getProducts';
import { getCategoriesQuery } from '~/gql/queries/getCategories';
import { getSearchProductsQuery } from '~/gql/queries/getSearchProducts';
import { getProductQuery } from '~/gql/queries/getProduct';

const promiseCache = new LRUCache({
  max: 500,
  ttl: 2000 * 60 * 60,
});

async function _fetchGraphQL(query, variables) {
  const { $graphql } = useNuxtApp();
  return await $graphql.default.request(query, variables);
}

export function fetchGraphQL(query, variables) {
  const hash = ohash([query, variables]);
  const state = useState(hash, () => null);
  const cacheEntry = promiseCache.get(hash);

  if (cacheEntry) {
    const isStale = Date.now() - cacheEntry.timestamp >= 2000 * 60 * 60;

    if (!isStale) {
      _fetchGraphQL(query, variables)
        .then(res => {
          if (JSON.stringify(res) !== JSON.stringify(cacheEntry.data)) {
            state.value = res;
            promiseCache.set(hash, { data: Promise.resolve(res), timestamp: Date.now() });
          }
        })
        .catch(e => {
          console.error('Error while revalidating:', e);
        });

      return cacheEntry.data;
    }
  }

  const fetchPromise = _fetchGraphQL(query, variables)
    .then(res => {
      state.value = res;
      promiseCache.set(hash, { data: Promise.resolve(res), timestamp: Date.now() });
      return res;
    })
    .catch(e => {
      promiseCache.delete(hash);
      throw e;
    });

  promiseCache.set(hash, { data: fetchPromise, timestamp: Date.now() });
  return fetchPromise;
}

export function listProducts(variables) {
  return fetchGraphQL(getProductsQuery, variables);
}

export function listCategories() {
  return fetchGraphQL(getCategoriesQuery);
}

export function searchProducts(search) {
  return fetchGraphQL(getSearchProductsQuery, { search });
}

export function getProduct(slug, sku) {
  return fetchGraphQL(getProductQuery, { slug, sku });
}
