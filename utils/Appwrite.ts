import {Account, Client, Databases, ID, Query, Storage} from "react-native-appwrite";


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('q-kenya')
    .setPlatform('com.q_kenya.Q')

const account = new Account(client)
const database = new Databases(client)
const storage = new Storage(client)

export const createPost = async (content: string, imageUrl: string | null, userId: string, authorName: string, mimeType: string) => {
  try {
    return await database.createDocument(
        'q_kenya',
        'q_posts',
        ID.unique(),
        {
          content,
          media: [imageUrl],
          user_id: userId,
          username: authorName,
          created_at: new Date().toISOString(),
        }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const uploadImage = async (image: any) => {
  try {
    const file = {
      uri: image.uri,
      name: image.fileName,
      type: image.mimeType,
      size: image.fileSize,
    };


    return await storage.createFile('q_media', ID.unique(), file);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


// Function to fetch post details
export const fetchPostDetails = async (postId: string) => {
  try {
    const response = await database.getDocument('q_kenya', 'q_posts', postId);
    return {
      userId: response.userId,
      content: response.content,
      image: response.image,
      createdAt: response.createdAt,
      likesCount: response.likesCount || 0,
      commentsCount: response.commentsCount || 0,
    };
  } catch (error) {
    console.error('Error fetching post details:', error);
    throw error;
  }
};

// Function to create a comment
export const createComment = async (postId: string, userId: string, comment: string) => {
  try {
    const commentData = {
      postId,
      userId,
      content: comment,
      createdAt: new Date().toISOString(),
    };

    return await database.createDocument('q_kenya', 'q_comments', ID.unique(), commentData);
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

// Function to fetch all comments under a post
export const fetchComments = async (postId: string) => {
  try {
    const response = await database.listDocuments('q_kenya', 'q_comments', [Query.equal('postId', postId)]);
    return response.documents;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Realtime functionality for comments
export const subscribeToComments = (postId: string, callback: (comments: any[]) => void) => {
  return client.subscribe(['databases.q_kenya.collections.q_comments.documents.create'], (response: any) => {
    const comments = response.documents.filter((comment: any) => comment.postId === postId);
    callback(comments);
  }); // Return unsubscribe function to stop listening
};

// export const subscribeToPosts = async (callback: (posts: any[])) => {
//   return client.subscribe(['databases.q_kenya.collections.q_posts.documents.create'], (response: any) => {
//     const posts = response.documents;
//     console.
//   });
// }r


export { client, account, storage, database }
