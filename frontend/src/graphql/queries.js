import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects($offset: Int!, $limit: Int!) {
    getProjects(offset: $offset, limit: $limit) {
      id
      title
      description
    }
  }
`;

export const GET_PROJECT = gql`
  query MyQuery($id: Int!) {
    getProject(id: $id) {
      id
      title
      ownerId
      description
      tasks {
        id
        status
        title
      }
    }
  }
`;

export const SEARCH_PROJECTS = gql`
  query SearchProjects($keyword: String!) {
    searchProjects(keyword: $keyword) {
      id
      title
      description
    }
  }
`;
