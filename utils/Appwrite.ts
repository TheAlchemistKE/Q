import {Account, Client, Databases, ID, Storage} from "react-native-appwrite";


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('q-kenya')
    .setPlatform('com.q_kenya.Q')

const account = new Account(client)
const database = new Databases(client)
const storage = new Storage(client)

export const createPost = async (content: string, imageUrl: string | null, userId: string) => {
  try {
    const response = await database.createDocument(
      'q_kenya',
      'q_posts',
      ID.unique(),
      {
        content,
        media: imageUrl,
          userId,
        createdAt: new Date().toISOString(),
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const uploadImage = async (blob: any) => {
  try {
    const file = await storage.createFile('q_media', ID.unique(), blob);
    console.log(file);
    return file; // Return the uploaded file information
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export { account, storage, database }
