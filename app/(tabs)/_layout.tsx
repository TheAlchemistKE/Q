import { Tabs } from 'expo-router';
import React from 'react';
import {Feather} from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TabsLayout: React.FC = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
          name="index"
          options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                  <Feather name="home" size={24} color={color} focused={focused} />
              )}}
      />
        <Tabs.Screen name="community" options={{
              title: 'Community',
              tabBarIcon: ({ color, focused }) => (
                   <MaterialCommunityIcons name="account-group" size={24} color={color} focused={focused} />
              )}} />
      <Tabs.Screen name="search" options={{
              title: 'Search',
              tabBarIcon: ({ color, focused }) => (
                  <Feather name="search" size={24} color={color} focused={focused} />
              )}} />
        <Tabs.Screen name="messages" options={{
              title: 'Messages',
              tabBarIcon: ({ color, focused }) => (
                  <Feather name="mail" size={24} color={color} focused={focused} />
              )}} />
    </Tabs>
  );
};

export default TabsLayout;
