import {SafeAreaView} from "react-native";
import AppHeader from "@/components/navigation/AppHeader";
import React from "react";

const ForumScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
             <AppHeader
                title="Forum"
                leftIcon="arrow-left" // Back button
                leftAction={() => console.log('Back Pressed')}
                rightIcons={[
                  { iconName: 'settings', action: () => console.log('Settings Pressed') },
                  { iconName: 'bell', action: () => console.log('Notifications Pressed') },
                ]}
              />
        </SafeAreaView>
    )
}

export default ForumScreen;