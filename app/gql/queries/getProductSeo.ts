import { gql } from 'nuxt-graphql-request/utils';

export const getProductSeoQuery = gql`
  query getProductSeo($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ... on VariableProduct {
        name
        description
        image {
          sourceUrl(size: LARGE)
        }
      }
    }
  }
`;
