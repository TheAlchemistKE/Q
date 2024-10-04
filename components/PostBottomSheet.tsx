import React, { useRef, useCallback, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { account, createPost, uploadImage } from "@/utils/Appwrite";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PostBottomSheet: React.FC<{ onClose: () => void; }> = ({ onClose }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [postContent, setPostContent] = React.useState<string>('');
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [userId, setUserId] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await account.get(); // Get the currently logged in user
        setUserId(user.$id); // Set the userId state
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const handlePresentModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleCloseModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    onClose();
  }, [onClose]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0]); // Log the file received from the image picker
      setSelectedImage(result.assets[0]);
    }
  };

  const handlePost = async () => {
    try {
      let imageUrl = null;
      if (selectedImage) {
        // Upload the image directly to Appwrite storage
        const uploadedFile = await uploadImage(selectedImage); // Pass the file URI directly
        imageUrl = uploadedFile?.$id; // Use the returned ID or URL of the uploaded file
      }

      // Create the post with content, image URL, and user ID
      if (userId) {
        await createPost(postContent, imageUrl, userId);
      } else {
        alert('User ID is required to create a post.');
      }

      console.log('Post created successfully');
      handleCloseModal(); // Close the modal after submission
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.fab}
        onPress={handlePresentModal}
      >
        <MaterialCommunityIcons name="feather" size={24} color="white" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={['50%']}
        onDismiss={handleCloseModal}
      >
        <View style={styles.container}>
          <TextInput
            placeholder="What's on your mind?"
            style={styles.textInput}
            value={postContent}
            onChangeText={setPostContent}
          />
          {selectedImage && (
            <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
          )}
          <Button title="Attach Image" onPress={pickImage} />
          <Button title="Post" onPress={handlePost} />
        </View>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 50, // Above the bottom navigation bar
    right: 20,
    backgroundColor: '#1DA1F2', // X's signature blue color for FAB
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default PostBottomSheet;
