import {SafeAreaView, Text} from "react-native";
import AppHeader from "@/components/navigation/AppHeader";
import React from "react";

const InboxScreen = () => {
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
    </SafeAreaView>
  );

}

export default InboxScreen;