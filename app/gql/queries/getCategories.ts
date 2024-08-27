import { gql } from 'nuxt-graphql-request/utils';

export const getCategoriesQuery = gql`
  query getCategories {
    productCategories(first: 100, where: { orderby: COUNT, order: DESC }) {
      nodes {
        id
        name
        image {
          sourceUrl
        }
        products(where: { stockStatus: IN_STOCK }, first: 1) {
          nodes {
            id
          }
        }
        children(first: 100, where: { orderby: COUNT, order: DESC }) {
          nodes {
            name
            image {
              sourceUrl
            }
            products(where: { stockStatus: IN_STOCK }, first: 1) {
              nodes {
                id
              }
            }
            children(first: 100, where: { orderby: COUNT, order: DESC }) {
              nodes {
                name
                image {
                  sourceUrl
                }
                products(where: { stockStatus: IN_STOCK }, first: 1) {
                  nodes {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
