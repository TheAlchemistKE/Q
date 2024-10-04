import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import AppHeader from "@/components/navigation/AppHeader";

const ExploreScreen = () => {
  return (
    <SafeAreaView>
        <AppHeader
        title="Search"
        leftIcon="arrow-left" // Back button
        leftAction={() => console.log('Back Pressed')}
        rightIcons={[
          { iconName: 'settings', action: () => console.log('Settings Pressed') },
          { iconName: 'bell', action: () => console.log('Notifications Pressed') },
        ]}
      />
      <Text>Explore the forum!</Text>
    </SafeAreaView>
  );
};

export default ExploreScreen;
