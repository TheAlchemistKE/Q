import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, RefreshControl } from 'react-native';
import { database } from "@/utils/Appwrite";
import PostCard from "@/components/PostCard";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      const response = await database.listDocuments('q_kenya', 'q_posts');
      setPosts(response.documents);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts(); // Call the fetchPosts function to get the latest data
    setRefreshing(false);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <PostCard
            content={item.content}
            mediaUri={item.mediaUri}
            mediaType={item.mediaType} // Ensure mediaType is passed
            userId={item.userId}
            username={item.username} // Pass username
            userAvatar={item.userAvatar} // Pass user avatar
          />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#6200ee"
          title="Updating feed..."
          titleColor="#6200ee"
          colors={['#6200ee']}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postContent: {
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default PostList;
