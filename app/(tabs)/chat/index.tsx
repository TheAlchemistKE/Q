import {SafeAreaView, Text, View} from "react-native";
import {ChannelList, Chat, OverlayProvider, StreamChatRN} from "stream-chat-expo"
import AppHeader from "@/components/navigation/AppHeader";
import React, {useEffect} from "react";
import { useChatContext } from '@/context/ChatContext';
import { useChatClient } from '@/hooks/useChatClient';
import { useAuth } from '@/context/AuthContext';
import {router} from "expo-router";
import {StreamChat} from "stream-chat";
import {streamAppId, streamAppSecret} from "@/utils/Stream";

const InboxScreen = (props: any) => {
    const {user} = useAuth()
    const { clientIsReady } = useChatClient();
    const client = StreamChat.getInstance(streamAppId, streamAppSecret)
     useEffect(() => {
         const streamChatConnection = async () => {
             const userToken = client.createToken(user?.$id!)
             await client.connectUser({
                 id: user?.$id!,
                 name: user?.name,
             }, userToken)
         }
         streamChatConnection()
     })

    const filters = {
      members: {
        '$in': [user?.$id!]
      },
    };
    
    const sort = {
      last_message_at: -1,
    };
    const options = { limit: 20, messages_limit: 30 };

    if (!clientIsReady) {
      return <Text>Loading chat ...</Text>
    }
    return (
    <View>
        <AppHeader
            title="Inbox"
            leftIcon="arrow-left" // Back button
            leftAction={() => router.back()}
            rightIcons={[
                { iconName: 'settings', action: () => console.log('Settings Pressed') },
                { iconName: 'bell', action: () => console.log('Notifications Pressed') },
            ]}
        />
       {/* @ts-ignore */}
       <Chat client={client}>
           <ChannelList
               filters={filters}
                //@ts-ignore
               sort={sort}
               options={options}
               onSelect={channel => console.log(channel)}
           />
       </Chat>
    </View>
  );

}

export default InboxScreen;