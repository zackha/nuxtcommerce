import { gql } from 'nuxt-graphql-request/utils';

export const addToCartMutation = gql`
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cartItem {
        key
        quantity
        product {
          node {
            sku
            slug
            name
          }
        }
        variation {
          node {
            name
            databaseId
            salePrice(format: RAW)
            regularPrice(format: RAW)
            image {
              sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
            }
          }
          attributes {
            value
          }
        }
      }
    }
  }
`;
