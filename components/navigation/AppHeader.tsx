import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type AppHeaderProps = {
  title: string;
  leftIcon?: string;
  leftAction?: () => void;
  rightIcons?: { iconName: string; action: () => void }[]; // Allows multiple icons on the right
};

const AppHeader: React.FC<AppHeaderProps> = ({ title, leftIcon, leftAction, rightIcons }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Left Icon */}
      {leftIcon && (
        <TouchableOpacity style={styles.leftIconContainer} onPress={leftAction}>
          {/* @ts-ignore */}
          <Feather name={leftIcon} size={24} color="#000" />
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icons */}
      <View style={styles.rightIconsContainer}>
        {rightIcons?.map((iconItem, index) => (
          <TouchableOpacity key={index} onPress={iconItem.action} style={styles.rightIcon}>
          {/* @ts-ignore */}
            <Feather name={iconItem.iconName} size={24} color="#000" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    height: 60,
    backgroundColor: '#fdfdfd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#333',
    color: '#000'
  },
  leftIconContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // White text for the title
    textAlign: 'center',
    flex: 1, // Take up space in the center
  },
  rightIconsContainer: {
    flexDirection: 'row',
  },
  rightIcon: {
    marginLeft: 16,
  },
});

export default AppHeader;
