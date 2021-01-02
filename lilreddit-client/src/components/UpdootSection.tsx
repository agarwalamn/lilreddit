import { Flex, IconButton } from "@chakra-ui/core";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import gql from "graphql-tag";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";
import { ApolloCache } from "@apollo/client";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}
const updateAfterVote = (
  postId: number,
  value: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });
  if (data) {
    console.log(data);
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment _ on Post {
          points
          voteStatus
        }
      `,
      data: {
        id: postId,
        points: newPoints,
        voteStatus: value,
      } as any,
    });
  }
};

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [vote] = useVoteMutation();
  return (
    <Flex direction="column" justify="center" align="center" mr={4}>
      <IconButton
        aria-label="upvote"
        colorScheme={post.voteStatus == 1 ? "green" : undefined}
        icon={
          <ChevronUpIcon
            h={8}
            w={8}
            cursor="pointer"
            onClick={async () => {
              if (post.voteStatus === 1) {
                return;
              }
              await vote({
                variables: {
                  postId: post.id,
                  value: 1,
                },
                update: (cache) => {
                  updateAfterVote(post.id, 1, cache);
                },
              });
            }}
          />
        }
      />
      {post.points}
      <IconButton
        aria-label="upvote"
        colorScheme={post.voteStatus == -1 ? "red" : undefined}
        icon={
          <ChevronDownIcon
            h={8}
            w={8}
            cursor="pointer"
            onClick={async () => {
              if (post.voteStatus === -1) {
                return;
              }
              await vote({
                variables: {
                  postId: post.id,
                  value: -1,
                },
                update: (cache) => {
                  updateAfterVote(post.id, -1, cache);
                },
              });
            }}
          />
        }
      />
    </Flex>
  );
};
