import { gql } from 'nuxt-graphql-request/utils';

export const checkoutMutation = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      result
      redirect
    }
  }
`;
