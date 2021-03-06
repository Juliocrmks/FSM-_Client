import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    variables: {
      postId,
      commentId,
    },
    update() {
      setConfirmOpen(false);
      if (callback) callback();
    },
    onError: (error) => {
      console.log(error);
    },
    refetchQueries: (refetchPosts) => {
      if (!commentId) {
        return [{ query: FETCH_POSTS_QUERY }];
      }
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setConfirmOpen(true)}
        floated="right"
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false);
        }}
        onConfirm={deletePostOrMutation}
      ></Confirm>
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
export default DeleteButton;
