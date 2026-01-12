// app/gql/queries/getProduct.ts
import { gql } from 'nuxt-graphql-request/utils';

export const getProductQuery = gql`
  query getProduct($slug: ID!, $sku: String!) {
    product(id: $slug, idType: SLUG) {
      ... on VariableProduct {
        databaseId
        sku
        slug
        name
        regularPrice
        salePrice
        description
        shortDescription
        image {
          sourceUrl(size: LARGE)
        }
        galleryImages {
          nodes {
            sourceUrl(size: LARGE)
          }
        }
        attributes {
          nodes {
            id
            label
            name
            options
          }
        }
        allPaColor {
          nodes {
            name
          }
        }
        allPaStyle {
          nodes {
            name
          }
        }
        productTypes {
          nodes {
            products(where: { stockStatus: IN_STOCK, search: $sku }) {
              nodes {
                slug
                image {
                  sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
                }
                allPaColor {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
        variations(where: { orderby: { field: NAME, order: DESC } }) {
          nodes {
            databaseId
            stockStatus
            stockQuantity
            attributes {
             nodes {
                label 
                name
                value
              }
            }
          }
        }
        related(first: 50) {
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
    }
  }
`;
