import seoFragment from '../fragments/seo';

const pageFragment = /* GraphQL */ `
  fragment page on Page {
    ... on Page {
      id
      title
      handle
      body
      bodySummary
      seo {
        ...seo
      }
      createdAt
      updatedAt
    }
  }
  ${seoFragment}
`;

export const getPageQuery = /* GraphQL */ `
  query getPage($handle: String!) {
    pageByHandle(handle: $handle) {
      ...page
    }
  }
  ${pageFragment}
`;

export const getPagesQuery = /* GraphQL */ `
  query getPages {
    pages(first: 100) {
      edges {
        node {
          ...page
        }
      }
    }
  }
  ${pageFragment}
`;

export const getMetaobjectsQuery = /* GraphQL */ `
  query getMetaobjects($type: String!) {
    metaobjects(type: $type, first: 10) {
      edges {
        node {
          id
          type
          fields {
            key
            value
          }
        }
      }
    }
  }
`;
