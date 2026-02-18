// app/gql/mutations/updateItemQuantities.ts
import { gql } from 'graphql-request';

export const updateItemQuantitiesMutation = gql`
  mutation updateItemQuantities($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        key
      }
    }
  }
`;
