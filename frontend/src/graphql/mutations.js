import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
      role
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($title: String!, $description: String!) {
    createProject(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $status: String!, $projectId: Int!) {
    createTask(title: $title, status: $status, projectId: $projectId) {
      id
      title
      status
      projectId
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(taskId: $id)
  }
`;
