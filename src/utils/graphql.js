import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      imageUrl
      latestMessage {
        from
        to
        content
        createdAt
      }
      createdAt
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      id
      from
      to
      content
      createdAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      id
      from
      to
      content
      createdAt
    }
  }
`;
