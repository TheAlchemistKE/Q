import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'tamagui';
import {Feather} from '@expo/vector-icons';
import {ResizeMode, Video} from 'expo-av';
import {storage} from "@/utils/Appwrite";

const { width } = Dimensions.get('window');

type PostCardProps = {
  content: string;
  mediaUri?: string;
  mediaType?: any;
  userId: string;
  username: string; // Add a username for the user
  userAvatar: string; // URL to the user's avatar image
};

const PostCard: React.FC<PostCardProps> = ({ content, mediaUri, mediaType, userId, username, userAvatar }) => {
  const [media, setMedia] = useState<string>('')
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchMedia = async () => {
      const url = storage.getFileView('q_media', mediaUri!)
      setMedia(url.toString())
    }
    fetchMedia()
  }, []);

  console.log(media);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar size="md" circular style={styles.avatar}>
          <Image source={{ uri: userAvatar }} style={styles.avatarImage} />
        </Avatar>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.userId}>@{userId}</Text>
        </View>
      </View>

      <Text style={styles.content}>{content}</Text>
      { mediaType === 'image/jpeg' ? (
          <Image source={{ uri: media }} style={styles.media}/>
      ): (<Video
              source={{ uri: media }}
              style={styles.media}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={false}
              useNativeControls
              onPlaybackStatusUpdate={status => setStatus(() => status)}
              isLooping
            />)}

      <View style={styles.actions}>
        <TouchableOpacity>
          <Feather name="message-circle" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="repeat" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="heart" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="share" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width, // Full width
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    marginRight: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flexDirection: 'column',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userId: {
    fontSize: 14,
    color: 'gray',
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});

export default PostCard;
