// app/gql/mutations/checkout.ts
import { gql } from 'graphql-request';

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
