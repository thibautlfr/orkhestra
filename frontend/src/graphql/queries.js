import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query MyQuery {
    getProjects {
      description
      id
      ownerId
      tasks {
        id
        projectId
        status
        title
      }
      title
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
