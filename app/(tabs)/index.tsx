import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import PostBottomSheet from "@/components/PostBottomSheet";
import PostList from "@/components/PostList";
import AppHeader from "@/components/navigation/AppHeader";

const { height, width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      {/* Custom App Header */}
      <AppHeader
        title="Home"
        leftIcon="arrow-left" // Back button
        leftAction={() => console.log('Back Pressed')}
        rightIcons={[
          { iconName: 'settings', action: () => console.log('Settings Pressed') },
          { iconName: 'bell', action: () => console.log('Notifications Pressed') },
        ]}
      />

      {/* Post Feed */}
      <PostList />

      {/* Floating Action Button (Create Post) */}


      {/* Post Bottom Sheet for creating posts */}
      {/* @ts-ignore*/}
      <PostBottomSheet onClose={() => setIsBottomSheetOpen(false)} isOpen={isBottomSheetOpen} />

      {/*/!* Bottom Navigation Bar *!/*/}
      {/*<View style={styles.bottomBar}>*/}
      {/*  <TouchableOpacity>*/}
      {/*    <Feather name="home" size={24} color="#fff" />*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity>*/}
      {/*    <Feather name="search" size={24} color="#fff" />*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity>*/}
      {/*    <Feather name="bell" size={24} color="#fff" />*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity>*/}
      {/*    <Feather name="mail" size={24} color="#fff" />*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Dark background to resemble X
    width: '100%',
    height: height,
  },
  topBar: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333', // Slightly visible border
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // White text for the logo
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 60,
    backgroundColor: '#000', // Dark background for bottom navigation
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
});

export default HomeScreen;
