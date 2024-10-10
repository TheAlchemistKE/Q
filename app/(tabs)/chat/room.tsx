import {useChatContext} from "@/context/ChatContext";
import {Channel, MessageInput, MessageList} from "stream-chat-expo";
import {SafeAreaView} from "react-native";

const ChatRoom = (props: any) => {
  const { navigation } = props;
  const { channel, setThread } = useChatContext();

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <Channel channel={channel}>
          <MessageList
            {/*  @ts-ignore */}
            onThreadSelect={(message: string) => {
                //@ts-ignore
              if (channel?.id) {
                setThread(message);
                navigation.navigate('ThreadScreen');
              }
            }}
          />
          <MessageInput />
        </Channel>
      </SafeAreaView>
  );
}

export default ChatRoom;