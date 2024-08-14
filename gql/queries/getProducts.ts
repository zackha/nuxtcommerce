import { gql } from 'nuxt-graphql-request/utils';

export const getProductsQuery = gql`
  query getProducts($after: String, $search: String, $category: String, $order: OrderEnum!, $field: ProductsOrderByEnum!) {
    products(first: 21, after: $after, where: { stockStatus: IN_STOCK, search: $search, category: $category, orderby: { field: $field, order: $order } }) {
      nodes {
        ... on VariableProduct {
          sku
          slug
          name
          regularPrice
          salePrice
          allPaStyle {
            nodes {
              name
            }
          }
          image {
            sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
          }
          galleryImages {
            nodes {
              sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
