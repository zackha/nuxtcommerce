import { gql } from 'nuxt-graphql-request/utils';

export const getSearchProductsQuery = gql`
  query getSearchProducts($search: String) {
    products(first: 6, where: { stockStatus: IN_STOCK, search: $search }) {
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
    }
  }
`;
