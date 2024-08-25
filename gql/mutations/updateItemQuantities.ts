import { gql } from 'nuxt-graphql-request/utils';

export const updateItemQuantitiesMutation = gql`
  mutation updateItemQuantities($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        key
      }
    }
  }
`;
