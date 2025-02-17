import { gql } from "@apollo/client";

export const ON_TASK_CREATED = gql`
  subscription {
    taskCreated {
      id
      title
      status
      projectId
    }
  }
`;
