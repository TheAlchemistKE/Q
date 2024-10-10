import React from 'react';
import { View, Text } from 'react-native';
import PostComments from "@/components/CommentsSection";
// import PostComments from './PostComments';

const PostDetailsScreen = ({ route }) => {
  const { postId, userId } = route.params; // Assuming you're passing postId and userId through route parameters

  return (
    <View style={{ flex: 1 }}>
      {/* Render other post details here */}
      <PostComments postId={postId} userId={userId} />
    </View>
  );
};

export default PostDetailsScreen;
