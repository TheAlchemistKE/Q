import {SafeAreaView, Text} from "react-native";
import {ChannelList} from "stream-chat-expo"
import AppHeader from "@/components/navigation/AppHeader";
import React from "react";
import { useChatContext } from '@/context/ChatContext';
import { useChatClient } from '@/hooks/useChatClient';
import { useAuth } from '@/context/AuthContext';

const InboxScreen = (props: any) => {
    const  { navigation } = props
    const { setChannel } = useChatContext();
    const {user} = useAuth()
    const { clientIsReady } = useChatClient();

    const filters = {
      members: {
        '$in': [user?.$id]
      },
    };
    
    const sort = {
      last_message_at: -1,
    };

    if (!clientIsReady) {
      return <Text>Loading chat ...</Text>
    }
    return (
    <SafeAreaView>
        <AppHeader
        title="Inbox"
        leftIcon="arrow-left" // Back button
        leftAction={() => console.log('Back Pressed')}
        rightIcons={[
          { iconName: 'settings', action: () => console.log('Settings Pressed') },
          { iconName: 'bell', action: () => console.log('Notifications Pressed') },
        ]}
      />
      <Text>Here is your inbox</Text>

      <ChannelList
          onSelect={(channel: any) => {
            const { navigation } = props;
            setChannel(channel);
            navigation.navigate('ChannelScreen');
          }}
          {/* @ts-ignore */}
          filters={filters}
          sort={sort}
      />


    </SafeAreaView>
  );

}

export default InboxScreen;