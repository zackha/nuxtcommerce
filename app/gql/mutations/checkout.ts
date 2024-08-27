import { gql } from 'nuxt-graphql-request/utils';

export const checkoutMutation = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        total
        orderNumber
        date
        paymentMethodTitle
      }
    }
  }
`;
