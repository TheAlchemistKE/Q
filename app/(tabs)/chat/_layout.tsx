import React from 'react';
import { Stack } from 'expo-router'
import {OverlayProvider} from "stream-chat-expo";

const ChatLayout = () => {
    return (
        <OverlayProvider>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }}/>
                <Stack.Screen name='index' options={{ headerShown: false }}/>
            </Stack>
        </OverlayProvider>
    )
}

export default ChatLayout;