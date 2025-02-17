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
