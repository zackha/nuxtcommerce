import { unref } from 'vue';

export function useGraphql(key, query, variables = {}) {
  return useAsyncData(key, () =>
    $fetch('/api/graphql', {
      method: 'POST',
      body: { query, variables: unref(variables) },
    })
  );
}
