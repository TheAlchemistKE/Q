import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance('YOUR_API_KEY');

interface StreamUser {
    id: string;
    name: string;
    image?: string;
    user_token?: string;
}

export const streamAppId='ckz7av5jj9n4';
export const streamAppSecret= 'r4z9bg4uerb2hjgpnn54vc7sa8e4xz2b7mp3qke2zs6mhu2mnpcrcngyxpbfywud'

export const chatApiKey = 'dz5f4d5kzrue'
export const chatUserId = 'lively-wood-7';
export const chatUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGl2ZWx5LXdvb2QtNyIsImV4cCI6MTcxMDUzMjQ0Nn0.KMkjl68QocLTO_B5E4jIw2s5VBmRLOIvFnZkYNQepmc';
export const chatUserName = 'lively';


const connectUser = async (user: StreamUser) => {
    try {
        await client.connectUser(
            {
              id: user.id,
              name: user.name,
              image: user?.image,
            },
            user?.user_token
          );
    } catch (error: any) {
        throw error
    }
}

const createChannel = async (channelName: string, users: [], channelId: string) => {
    try {
        const channel = client.channel('messaging', channelId, {
            name: channelName,
            members: users,
          });
    } catch (error: any) {
        throw error
    }
}

// const sendMessage = async ()