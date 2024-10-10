import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import {AuthProvider} from "@/context/AuthContext";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {TamaguiProvider} from "tamagui";
import config from "@/tamagui.config";
import {ChatProvider} from "@/context/ChatContext";

const RootLayout: React.FC = () => {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <AuthProvider>
                <ChatProvider>
                    <TamaguiProvider config={config}>
                      <View style={{ flex: 1 }}>
                        <Slot />
                      </View>
                    </TamaguiProvider>
                </ChatProvider>
            </AuthProvider>
          </BottomSheetModalProvider>
      </GestureHandlerRootView>
  );
};

export default RootLayout;
