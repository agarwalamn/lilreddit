import React from "react";
import { Layout } from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/core";
import { useGePostFromUrl } from "../../utils/useGetPostFromUrl";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import { withApollo } from "../../utils/withApollo";

const Post: React.FC<{}> = ({}) => {
  const { data, error, loading } = useGePostFromUrl();
  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>{error.message}</div>
      </Layout>
    );
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>no posts haha</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      {data.post.text}
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creatorId}
      />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
