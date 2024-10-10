// app/posts/comments.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchComments, createComment } from '@/utils/Appwrite';

const CommentsPage: React.FC<{ postId: string }> = ({ postId }) => {
  const router = useRouter();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPostComments = async () => {
      const fetchedComments = await fetchComments(postId);
      setComments(fetchedComments);
    };

    fetchPostComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await createComment(postId, newComment);
      setNewComment(''); // Clear input field
      // Re-fetch comments after adding a new one
      const fetchedComments = await fetchComments(postId);
      setComments(fetchedComments);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text>{item.content}</Text>
            <Button title="Reply" onPress={() => {/* Navigate to reply page if needed */}} />
          </View>
        )}
      />
      <TextInput
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
        style={styles.input}
      />
      <Button title="Comment" onPress={handleAddComment} />
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  commentItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
});

export default CommentsPage;
