import React from 'react';
import { View, Text } from 'react-native';
import { Slot } from 'expo-router';
import {AuthProvider} from "@/context/AuthContext";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {TamaguiProvider} from "tamagui";
import config from "@/tamagui.config";

const RootLayout: React.FC = () => {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <AuthProvider>
                <TamaguiProvider config={config}>
                  <View style={{ flex: 1 }}>
                    <Slot />
                  </View>
                </TamaguiProvider>
            </AuthProvider>
          </BottomSheetModalProvider>
      </GestureHandlerRootView>
  );
};

export default RootLayout;
