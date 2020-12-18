import { Flex, IconButton } from "@chakra-ui/core";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
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
                postId: post.id,
                value: 1,
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
                postId: post.id,
                value: -1,
              });
            }}
          />
        }
      />
    </Flex>
  );
};
