import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, Button} from 'react-native';
import { createComment, fetchComments, subscribeToComments } from '@/utils/Appwrite';

const PostComments: React.FC<{ postId: string; userId: string; }> = ({ postId, userId }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    // Fetch initial comments
    const fetchInitialComments = async () => {
      try {
        const initialComments = await fetchComments(postId);
        setComments(initialComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchInitialComments();

    // Subscribe to real-time updates for comments
    const unsubscribe = subscribeToComments(postId, setComments);

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Prevent adding empty comments

    try {
      await createComment(postId, userId, newComment);
      setNewComment(''); // Clear input field after adding comment
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Send" onPress={handleAddComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  commentContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
});

export default PostComments;
