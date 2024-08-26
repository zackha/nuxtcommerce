import { gql } from 'nuxt-graphql-request/utils';

export const addToCartMutation = gql`
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cartItem {
        key
        quantity
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
